import { describe, it, expect, beforeEach } from 'vitest';
import { GeneralAPI } from '../../src/api/GeneralAPI.js';
import { mockConfig } from '../mocks/config.js';
import { vi } from 'vitest';

describe('GeneralAPI', () => {
  let api: GeneralAPI;

  beforeEach(() => {
    api = new GeneralAPI(mockConfig);
  });

  describe('getStats', () => {
    it('should make a GET request to /api/stats', async () => {
      const mockResponse = {
        success: true,
        data: [{
          server_id: 1,
          server_name: 'Test Server',
          server_location: 'Test Location',
          server_status: 'online',
          server_load: 50,
          server_downloads: 1000
        }]
      };

      // Mock the request method
      vi.spyOn(api as any, 'request').mockResolvedValue(mockResponse);

      const result = await api.getStats();

      expect(api['request']).toHaveBeenCalledWith('/api/stats', {
        method: 'GET'
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 