import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsenetAPI } from '../../src/api/UsenetApi.js';
import { mockConfig } from '../mocks/config.js';

// Mock the BaseClient
vi.mock('../../BaseClient', () => ({
  BaseClient: vi.fn().mockImplementation(() => ({
    request: vi.fn(),
  })),
}));

describe('UsenetAPI', () => {
  let api: UsenetAPI;
  
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    api = new UsenetAPI(mockConfig);
  });

  describe('createUsenetDownload', () => {
    it('should create download with file', async () => {
      const mockFile = new Blob(['test'], { type: 'application/x-nzb' });
      const options = { file: mockFile, name: 'test.nzb' };
      
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      
      const result = await api.createUsenetDownload(options);
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/createusenetdownload', {
        method: 'POST',
        body: expect.any(FormData),
      });
      expect(result).toEqual({ success: true });
    });

    it('should create download with URL', async () => {
      const options = { url: 'http://example.com/test.nzb' };
      
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      
      const result = await api.createUsenetDownload(options);
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/createusenetdownload', {
        method: 'POST',
        body: expect.any(FormData),
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe('controlUsenetDownload', () => {
    it('should control download with valid operations', async () => {
      const operations: ('delete' | 'resume' | 'pause')[] = ['delete', 'resume', 'pause'];
      
      for (const operation of operations) {
        vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
        
        const result = await api.controlUsenetDownload(123, operation);
        
        expect((api as any).request).toHaveBeenCalledWith('/usenet/controlusenetdownload', {
          method: 'POST',
          body: JSON.stringify({
            download_id: 123,
            operation,
          }),
        });
        expect(result).toEqual({ success: true });
      }
    });
  });

  describe('requestDownloadLink', () => {
    it('should request download link with minimum params', async () => {
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true, data: 'download-url' });
      
      const result = await api.requestDownloadLink({ download_id: 123 });
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/requestdl', {
        method: 'GET',
        params: { download_id: 123 },
      });
      expect(result).toEqual({ success: true, data: 'download-url' });
    });

    it('should request download link with all params', async () => {
      const params = {
        download_id: 123,
        file_id: 456,
        zip_link: true,
      };
      
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true, data: 'download-url' });
      
      const result = await api.requestDownloadLink(params);
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/requestdl', {
        method: 'GET',
        params,
      });
      expect(result).toEqual({ success: true, data: 'download-url' });
    });
  });

  describe('getDownloadList', () => {
    it('should get download list without params', async () => {
      const mockResponse = { success: true, data: [] };
      vi.spyOn(api as any, 'request').mockResolvedValue(mockResponse);
      
      const result = await api.getDownloadList();
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/mylist', {
        method: 'GET',
        params: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get download list with params', async () => {
      const params = {
        bypass_cache: true,
        id: 123,
        offset: 0,
        limit: 10,
      };
      const mockResponse = { success: true, data: [] };
      
      vi.spyOn(api as any, 'request').mockResolvedValue(mockResponse);
      
      const result = await api.getDownloadList(params);
      
      expect((api as any).request).toHaveBeenCalledWith('/usenet/mylist', {
        method: 'GET',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 