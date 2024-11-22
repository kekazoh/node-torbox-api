import { TorboxClient } from '../../src/client.js';
import { TorrentsAPI } from '../../src/api/torrentsApi.js';
import { UserAPI } from '../../src/api/userApi.js';
import { WebAPI } from '../../src/api/webApi.js';
import { UsenetAPI } from '../../src/api/usenetApi.js';
import { RssAPI } from '../../src/api/rssApi.js';
import { TorboxConfig } from '../../src/interfaces.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TorboxClient', () => {
  let client: TorboxClient;
  const mockConfig: TorboxConfig = {
    apiKey: 'test-api-key',
    baseURL: 'https://test.api.com',
  };

  beforeEach(() => {
    client = new TorboxClient(mockConfig);
  });

  describe('constructor', () => {
    it('should throw error if apiKey is not provided', () => {
      expect(() => new TorboxClient({} as TorboxConfig)).toThrow();
    });
  });

  describe('API instances', () => {
    it('should properly initialize TorrentsAPI', () => {
      expect(client.torrents).toBeInstanceOf(TorrentsAPI);
      expect(client.torrents['baseURL']).toBe(mockConfig.baseURL);
      expect(client.torrents['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should properly initialize UserAPI', () => {
      expect(client.users).toBeInstanceOf(UserAPI);
      expect(client.users['baseURL']).toBe(mockConfig.baseURL);
      expect(client.users['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should properly initialize WebAPI', () => {
      expect(client.web).toBeInstanceOf(WebAPI);
      expect(client.web['baseURL']).toBe(mockConfig.baseURL);
      expect(client.web['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should properly initialize UsenetAPI', () => {
      expect(client.usenet).toBeInstanceOf(UsenetAPI);
      expect(client.usenet['baseURL']).toBe(mockConfig.baseURL);
      expect(client.usenet['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should properly initialize RssAPI', () => {
      expect(client.rss).toBeInstanceOf(RssAPI);
      expect(client.rss['baseURL']).toBe(mockConfig.baseURL);
      expect(client.rss['headers']).toEqual({
        'Authorization': `Bearer ${mockConfig.apiKey}`,
        'Content-Type': 'application/json',
      });
    });

    it('should pass the same config to all API instances', () => {
      const config: TorboxConfig = {
        apiKey: 'different-key',
        baseURL: 'https://different.api.com',
      };
      
      const newClient = new TorboxClient(config);
      
      const apis = [
        newClient.torrents,
        newClient.users,
        newClient.web,
        newClient.usenet,
        newClient.rss,
      ];

      apis.forEach(api => {
        expect(api['baseURL']).toBe(config.baseURL);
        expect((api['headers'] as Record<string, string>).Authorization).toBe(`Bearer ${config.apiKey}`);
      });
    });
  });
});
