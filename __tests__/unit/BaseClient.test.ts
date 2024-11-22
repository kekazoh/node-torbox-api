import { BaseClient } from '../../src/api/BaseClient.js';
import { TorboxConfig } from '../../src/interfaces.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BaseClient', () => {
  let client: BaseClient;
  const mockConfig: TorboxConfig = {
    apiKey: 'test-api-key',
    baseURL: 'https://test.api.com',
  };

  beforeEach(() => {
    client = new BaseClient(mockConfig);
    // Reset fetch mock between tests
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with provided config', () => {
      expect(client['baseURL']).toBe(mockConfig.baseURL);
      expect(client['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should use default baseURL if not provided', () => {
      const clientWithoutBaseURL = new BaseClient({ apiKey: 'test-key' });
      expect(clientWithoutBaseURL['baseURL']).toBe('https://api.torbox.app');
    });

    it('should throw error if apiKey is not provided', () => {
      expect(() => new BaseClient({} as TorboxConfig)).toThrowError('API key is required');
    });
  });

  describe('buildQueryString', () => {
    it('should build query string from params', () => {
      const params = {
        name: 'test',
        id: 123,
        active: true,
      };
      const queryString = client['buildQueryString'](params);
      expect(queryString).toBe('?name=test&id=123&active=true');
    });

    it('should handle empty params', () => {
      const queryString = client['buildQueryString']({});
      expect(queryString).toBe('');
    });

    it('should filter out undefined values', () => {
      const params = {
        name: 'test',
        id: undefined,
        active: true,
      };
      const queryString = client['buildQueryString'](params);
      expect(queryString).toBe('?name=test&active=true');
    });

    it('should properly encode special characters', () => {
      const params = {
        name: 'test & special',
        query: 'hello world!',
      };
      const queryString = client['buildQueryString'](params);
      expect(queryString).toBe('?name=test%20%26%20special&query=hello%20world!');
    });
  });
}); 