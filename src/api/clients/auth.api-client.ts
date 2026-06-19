import { BaseAPIClient } from './base.api-client';
import { APIResponse } from '@playwright/test';

export class AuthAPIClient extends BaseAPIClient {
  /**
   * Logs in a user with the provided credentials.
   * @param credentials Object containing email and password.
   */
  async login(credentials: Record<string, string>): Promise<APIResponse> {
    return await this.post('/api/v1/auth/login', credentials);
  }

  /**
   * Logs out the currently authenticated session.
   */
  async logout(): Promise<APIResponse> {
    return await this.post('/api/v1/auth/logout');
  }
}
