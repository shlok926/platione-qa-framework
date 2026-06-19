import { BaseDBSeeder } from './base.db-seeder';
import { ContactRecord } from '../../../types';

export class ContactDBSeeder extends BaseDBSeeder<ContactRecord> {
  protected get tableName(): string {
    return 'contacts';
  }
}
