import dotenv from 'dotenv';
import path from 'path';

// Load environment variables. Default to root .env if DOTENV_CONFIG_PATH is not defined.
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || path.resolve(__dirname, '../../.env') });

export class ConfigManager {
  /**
   * Helper to retrieve a key or throw an descriptive error.
   */
  private static getOrThrow(key: string): string {
    const value = process.env[key];
    if (value === undefined || value === '') {
      throw new Error(`Missing required configuration environment variable: ${key}`);
    }
    return value;
  }

  /**
   * Helper to retrieve a key or return a default fallback.
   */
  private static getOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  static get appBaseUrl(): string {
    return this.getOrDefault('APP_BASE_URL', 'http://localhost:4200');
  }

  static get apiBaseUrl(): string {
    return this.getOrDefault('API_BASE_URL', 'http://localhost:8080');
  }

  static get dbHost(): string {
    return this.getOrDefault('DB_HOST', 'localhost');
  }

  static get dbPort(): number {
    return parseInt(this.getOrDefault('DB_PORT', '3306'), 10);
  }

  static get dbName(): string {
    return this.getOrDefault('DB_NAME', 'platione_test');
  }

  static get dbUser(): string {
    return this.getOrDefault('DB_USER', 'qa_user');
  }

  static get dbPassword(): string {
    return this.getOrDefault('DB_PASSWORD', 'your_db_password_here');
  }

  static get testUserEmail(): string {
    return this.getOrDefault('TEST_USER_EMAIL', 'qa@platione.com');
  }

  static get testUserPassword(): string {
    return this.getOrDefault('TEST_USER_PASSWORD', 'QA_Password123');
  }

  static get logLevel(): string {
    return this.getOrDefault('LOG_LEVEL', 'info');
  }

  static get environment(): string {
    return this.getOrDefault('ENVIRONMENT', 'qa');
  }
}
