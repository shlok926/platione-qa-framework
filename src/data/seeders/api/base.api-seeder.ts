import { APIRequestContext } from '@playwright/test';

export abstract class BaseAPISeeder<TCreate, TResponse extends { id: string | number }> {
  protected seededIds: (string | number)[] = [];

  constructor(
    protected apiClient: APIRequestContext,
    protected authToken: string = '',
  ) {}

  /**
   * Endpoint path, e.g. '/api/v1/contacts'
   */
  protected abstract get endpoint(): string;

  /**
   * Seeds a single entity.
   */
  async seed(payload: TCreate): Promise<TResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const response = await this.apiClient.post(this.endpoint, {
      data: payload,
      headers,
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Failed to seed data to ${this.endpoint}. Status: ${response.status()} ${response.statusText()}. Response: ${body}`);
    }

    const responseData = (await response.json()) as TResponse;
    this.seededIds.push(responseData.id);
    return responseData;
  }

  /**
   * Seeds multiple entities.
   */
  async seedMany(payloads: TCreate[]): Promise<TResponse[]> {
    const results: TResponse[] = [];
    for (const payload of payloads) {
      const res = await this.seed(payload);
      results.push(res);
    }
    return results;
  }

  /**
   * Deletes a specific seeded entity by ID.
   */
  async cleanupById(id: string | number): Promise<void> {
    const headers: Record<string, string> = {};
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const response = await this.apiClient.delete(`${this.endpoint}/${id}`, {
      headers,
    });

    if (!response.ok() && response.status() !== 404) {
      const body = await response.text();
      throw new Error(`Failed to delete entity with ID ${id} from ${this.endpoint}. Status: ${response.status()}. Response: ${body}`);
    }

    this.seededIds = this.seededIds.filter((item) => item !== id);
  }

  /**
   * Deletes all entities seeded by this instance.
   */
  async cleanup(): Promise<void> {
    const idsToCleanup = [...this.seededIds];
    for (const id of idsToCleanup) {
      try {
        await this.cleanupById(id);
      } catch (err) {
        console.error(`[Seeder Cleanup Warning]: Failed to delete ${this.endpoint}/${id}:`, err);
      }
    }
  }

  /**
   * Returns list of currently tracked seeded IDs.
   */
  getSeededIds(): (string | number)[] {
    return this.seededIds;
  }
}
