import { BaseAPIClient } from './base.api-client';
import { APIResponse } from '@playwright/test';
import { ActionPayload } from '../../types';

export class ActionAPIClient extends BaseAPIClient {
  /**
   * Creates a new action/task.
   */
  async createAction(payload: ActionPayload): Promise<APIResponse> {
    return await this.post('/api/v1/actions', payload);
  }

  /**
   * Updates status of an action (e.g. pending, completed, cancelled).
   */
  async updateStatus(id: string | number, status: 'pending' | 'completed' | 'cancelled'): Promise<APIResponse> {
    return await this.patch(`/api/v1/actions/${id}/status`, { status });
  }

  /**
   * Retrieves all actions associated with a specific contact.
   */
  async getActionsForContact(contactId: string | number): Promise<APIResponse> {
    return await this.get(`/api/v1/contacts/${contactId}/actions`);
  }
}
