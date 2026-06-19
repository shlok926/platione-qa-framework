import { BaseAPIClient } from './base.api-client';
import { APIResponse } from '@playwright/test';
import { ContactPayload } from '../../types';

export class ContactAPIClient extends BaseAPIClient {
  /**
   * Creates a new contact.
   */
  async createContact(payload: ContactPayload): Promise<APIResponse> {
    return await this.post('/api/v1/contacts', payload);
  }

  /**
   * Retrieves a single contact by ID.
   */
  async getContact(id: string | number): Promise<APIResponse> {
    return await this.get(`/api/v1/contacts/${id}`);
  }

  /**
   * Lists contacts with optional query filters.
   */
  async listContacts(filters?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return await this.get('/api/v1/contacts', filters);
  }

  /**
   * Updates an existing contact.
   */
  async updateContact(id: string | number, partialPayload: Partial<ContactPayload>): Promise<APIResponse> {
    return await this.put(`/api/v1/contacts/${id}`, partialPayload);
  }

  /**
   * Deletes a contact by ID.
   */
  async deleteContact(id: string | number): Promise<APIResponse> {
    return await this.delete(`/api/v1/contacts/${id}`);
  }
}
