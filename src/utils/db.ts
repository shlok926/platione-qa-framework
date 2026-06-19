import mysql from 'mysql2/promise';
import { ConfigManager } from './config';
import { logger } from './logger';

export class DBConnectionManager {
  private pool: mysql.Pool | null = null;

  /**
   * Returns or initializes the connection pool.
   */
  private getPool(): mysql.Pool {
    if (!this.pool) {
      this.pool = mysql.createPool({
        host: ConfigManager.dbHost,
        port: ConfigManager.dbPort,
        database: ConfigManager.dbName,
        user: ConfigManager.dbUser,
        password: ConfigManager.dbPassword,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      logger.info('MySQL Connection Pool initialized successfully.');
    }
    return this.pool;
  }

  /**
   * Executes a database query asynchronously and returns the raw results.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(sql: string, params: any[] = []): Promise<any> {
    try {
      const pool = this.getPool();
      const [result] = await pool.execute(sql, params);
      return result;
    } catch (error) {
      logger.error(`Database query execution failed: ${sql}`, { error, params });
      throw error;
    }
  }

  /**
   * Closes the database pool and releases all connections.
   */
  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info('MySQL Connection Pool terminated.');
    }
  }
}

export const db = new DBConnectionManager();
export const DBUtils = DBConnectionManager; // Alias for backward compatibility
