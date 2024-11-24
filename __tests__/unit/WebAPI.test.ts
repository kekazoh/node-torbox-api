import { WebAPI } from '../../src/api/WebApi.js';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { mockConfig } from '../mocks/config.js';

describe('WebAPI', () => {
  let api: WebAPI;
  const mockResponse = { success: true, data: 'test' };

  beforeEach(() => {
    api = new WebAPI(mockConfig);
    (api as any).request = vi.fn().mockResolvedValue(mockResponse);
  });

  describe('createWebDownload', () => {
    it('should create download with minimal options', async () => {
      const options = { url: 'https://example.com/file.zip' };
      await api.createWebDownload(options);

      const formData = new FormData();
      formData.append('url', options.url);

      expect((api as any).request).toHaveBeenCalledWith('/webdl/createwebdownload', {
        method: 'POST',
        body: expect.any(FormData)
      });
    });

    it('should create download with all options', async () => {
      const options = {
        url: 'https://example.com/file.zip',
        name: 'custom-name',
        as_queued: true
      };
      await api.createWebDownload(options);

      const formData = new FormData();
      formData.append('url', options.url);
      formData.append('name', options.name);
      formData.append('as_queued', options.as_queued.toString());

      expect((api as any).request).toHaveBeenCalledWith('/webdl/createwebdownload', {
        method: 'POST',
        body: formData
      });
    });
  });
}); 