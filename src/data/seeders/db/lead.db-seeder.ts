import { BaseDBSeeder } from './base.db-seeder';
import { LeadRecord } from '../../../types';

export class LeadDBSeeder extends BaseDBSeeder<LeadRecord> {
  protected get tableName(): string {
    return 'leads';
  }
}
