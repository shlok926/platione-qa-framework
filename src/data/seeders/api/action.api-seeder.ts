import { BaseAPISeeder } from './base.api-seeder';
import { ActionPayload, ActionResponse } from '../../../types';

export class ActionAPISeeder extends BaseAPISeeder<ActionPayload, ActionResponse> {
  protected get endpoint(): string {
    return '/api/v1/actions';
  }
}
