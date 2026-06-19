export class AuthUtils {
  /**
   * Generates a base64url-encoded mock JWT token format.
   */
  static generateMockToken(email: string, role: string = 'admin'): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(
      JSON.stringify({
        sub: email,
        role,
        exp: Math.floor(Date.now() / 1000) + 3600, // Expire in 1 hour
        iat: Math.floor(Date.now() / 1000),
      })
    ).toString('base64url');
    const signature = 'mock_signature_signature';
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Decodes the payload portion of our mock JWT token.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static decodeMockToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payloadBase64 = parts[1];
      const jsonStr = Buffer.from(payloadBase64, 'base64url').toString('utf8');
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }

  /**
   * Checks if the mock token's exp field is in the past.
   */
  static isTokenExpired(token: string): boolean {
    const payload = this.decodeMockToken(token);
    if (!payload || !payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }
}
