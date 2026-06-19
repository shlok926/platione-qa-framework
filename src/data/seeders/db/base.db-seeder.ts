import { DBConnectionManager, db } from '../../../utils/db';

export abstract class BaseDBSeeder<T extends Record<string, any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
  protected abstract get tableName(): string;
  protected db: DBConnectionManager = db;
  protected insertedIds: number[] = [];

  /**
   * Inserts a single record into the database table.
   * Returns the auto-incremented ID.
   */
  async insert(data: T): Promise<number> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

    const result = await this.db.execute(sql, values);
    const insertId = result.insertId;
    this.insertedIds.push(insertId);
    return insertId;
  }

  /**
   * Inserts multiple records in sequence.
   */
  async insertMany(dataList: T[]): Promise<number[]> {
    const ids: number[] = [];
    for (const data of dataList) {
      const id = await this.insert(data);
      ids.push(id);
    }
    return ids;
  }

  /**
   * Cleans up all rows inserted by this seeder instance.
   */
  async cleanup(): Promise<void> {
    if (this.insertedIds.length === 0) return;
    const placeholders = this.insertedIds.map(() => '?').join(', ');
    const sql = `DELETE FROM ${this.tableName} WHERE id IN (${placeholders})`;
    await this.db.execute(sql, this.insertedIds);
    this.insertedIds = [];
  }

  /**
   * Truncates the table. Use with caution.
   */
  async truncate(): Promise<void> {
    await this.db.execute('SET FOREIGN_KEY_CHECKS = 0');
    await this.db.execute(`TRUNCATE TABLE ${this.tableName}`);
    await this.db.execute('SET FOREIGN_KEY_CHECKS = 1');
    this.insertedIds = [];
  }

  /**
   * Gets list of inserted IDs.
   */
  getInsertedIds(): number[] {
    return this.insertedIds;
  }
}
