import { BaseDBSeeder } from './base.db-seeder';
import { ActionRecord } from '../../../types';

export class ActionDBSeeder extends BaseDBSeeder<ActionRecord> {
  protected get tableName(): string {
    return 'actions';
  }
}
