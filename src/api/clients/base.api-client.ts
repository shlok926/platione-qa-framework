import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseAPIClient {
  constructor(
    protected request: APIRequestContext,
    protected baseURL: string = process.env.API_BASE_URL || 'http://localhost:8080',
    protected authToken: string = '',
  ) {}

  /**
   * Sets or updates the authorization token for subsequent requests.
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Constructs the standard headers including Authorization if present.
   */
  protected getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  /**
   * Helper to perform HTTP GET request.
   */
  protected async get(path: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    const queryParams = params
      ? Object.fromEntries(
          Object.entries(params).map(([key, val]) => [key, String(val)])
        )
      : undefined;

    return await this.request.get(`${this.baseURL}${path}`, {
      params: queryParams,
      headers: this.getHeaders(),
    });
  }

  /**
   * Helper to perform HTTP POST request.
   */
  protected async post(path: string, data?: unknown): Promise<APIResponse> {
    return await this.request.post(`${this.baseURL}${path}`, {
      data,
      headers: this.getHeaders(),
    });
  }

  /**
   * Helper to perform HTTP PUT request.
   */
  protected async put(path: string, data?: unknown): Promise<APIResponse> {
    return await this.request.put(`${this.baseURL}${path}`, {
      data,
      headers: this.getHeaders(),
    });
  }

  /**
   * Helper to perform HTTP PATCH request.
   */
  protected async patch(path: string, data?: unknown): Promise<APIResponse> {
    return await this.request.patch(`${this.baseURL}${path}`, {
      data,
      headers: this.getHeaders(),
    });
  }

  /**
   * Helper to perform HTTP DELETE request.
   */
  protected async delete(path: string): Promise<APIResponse> {
    return await this.request.delete(`${this.baseURL}${path}`, {
      headers: this.getHeaders(),
    });
  }
}
