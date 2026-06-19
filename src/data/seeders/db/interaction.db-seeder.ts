import { BaseDBSeeder } from './base.db-seeder';
import { InteractionRecord } from '../../../types';

export class InteractionDBSeeder extends BaseDBSeeder<InteractionRecord> {
  protected get tableName(): string {
    return 'interactions';
  }
}
