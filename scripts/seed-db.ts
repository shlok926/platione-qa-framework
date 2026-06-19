import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || path.resolve(__dirname, '../.env.qa') });

async function run() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'qa_user';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'platione_test';

  console.log(`[seed-db] Connecting to MySQL server at ${host}:${port}...`);
  
  // Connect without database to ensure it exists
  const initConnection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  console.log(`[seed-db] Ensuring database "${database}" exists...`);
  await initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await initConnection.end();

  // Reconnect with the database and multipleStatements: true
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    multipleStatements: true,
  });

  try {
    // 1. Create migrations table if not exists
    console.log('[seed-db] Ensuring schema_migrations table exists...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        migration_name VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Read migrations directory
    const migrationsDir = path.resolve(__dirname, '../database/migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.warn(`[seed-db] Migrations directory does not exist at ${migrationsDir}`);
      return;
    }

    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log(`[seed-db] Found ${migrationFiles.length} migration file(s).`);

    // 3. Apply pending migrations
    for (const file of migrationFiles) {
      const [rows] = await connection.query(
        'SELECT migration_name FROM schema_migrations WHERE migration_name = ?',
        [file]
      ) as [unknown[], unknown];

      if (rows.length > 0) {
        console.log(`[seed-db] Migration ${file} is already applied. Skipping.`);
        continue;
      }

      console.log(`[seed-db] Applying migration: ${file}...`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      // Execute the migration in a transaction
      await connection.beginTransaction();
      try {
        await connection.query(sql);
        await connection.query('INSERT INTO schema_migrations (migration_name) VALUES (?)', [file]);
        await connection.commit();
        console.log(`[seed-db] Migration ${file} applied successfully.`);
      } catch (err) {
        await connection.rollback();
        console.error(`[seed-db] Error applying migration ${file}. Transaction rolled back.`);
        throw err;
      }
    }

    // 4. Seed baseline data
    const baselineSeedPath = path.resolve(__dirname, '../database/seeds/baseline.sql');
    if (fs.existsSync(baselineSeedPath)) {
      console.log('[seed-db] Seeding baseline data...');
      const seedSql = fs.readFileSync(baselineSeedPath, 'utf8');
      await connection.query(seedSql);
      console.log('[seed-db] Baseline data seeded successfully.');
    } else {
      console.warn(`[seed-db] Baseline seed file not found at ${baselineSeedPath}`);
    }

    console.log('[seed-db] Database seeding and migration completed successfully.');
  } catch (error) {
    console.error('[seed-db] Fatal seeding error:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

run();
