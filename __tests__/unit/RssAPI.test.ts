import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RssAPI } from '../../src/api/RssAPI.js';
import { mockConfig } from '../mocks/config.js';

// Mock the BaseClient
vi.mock('../../src/BaseClient.js', () => ({
  BaseClient: vi.fn().mockImplementation(() => ({
    request: vi.fn(),
  })),
}));

describe('RssAPI', () => {
  let api: RssAPI;

  beforeEach(() => {
    vi.clearAllMocks();
    api = new RssAPI(mockConfig);
  });

  describe('addRss', () => {
    it('should add RSS feed with minimum required options', async () => {
      const options = { url: 'https://example.com/feed.xml' };
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      const result = await api.addRss(options);
      
      expect((api as any).request).toHaveBeenCalledWith('/rss/addrss', {
        method: 'POST',
        body: JSON.stringify(options),
      });
      expect(result).toEqual({ success: true });
    });

    it('should add RSS feed with all options', async () => {
      const options = {
        url: 'https://example.com/feed.xml',
        name: 'Test Feed',
        regex: '.*episode.*',
        as_queued: true,
      };
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      
      const result = await api.addRss(options);
      
      expect((api as any).request).toHaveBeenCalledWith('/rss/addrss', {
        method: 'POST',
        body: JSON.stringify(options),
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe('modifyRss', () => {
    it('should modify RSS feed with single option', async () => {
      const feedId = 123;
      const options = { name: 'Updated Feed Name' };
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      
      const result = await api.modifyRss(feedId, options);
      
      expect((api as any).request).toHaveBeenCalledWith('/rss/modifyrss', {
        method: 'POST',
        body: JSON.stringify({
          feed_id: feedId,
          ...options,
        }),
      });
      expect(result).toEqual({ success: true });
    });

    it('should modify RSS feed with multiple options', async () => {
      const feedId = 123;
      const options = {
        name: 'Updated Feed Name',
        regex: '.*updated.*',
        as_queued: false,
      };
      vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
      
      const result = await api.modifyRss(feedId, options);
      
      expect((api as any).request).toHaveBeenCalledWith('/rss/modifyrss', {
        method: 'POST',
        body: JSON.stringify({
          feed_id: feedId,
          ...options,
        }),
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe('controlRss', () => {
    it('should control RSS feed with valid operations', async () => {
      const feedId = 123;
      const operations: ('delete' | 'pause' | 'resume')[] = ['delete', 'pause', 'resume'];
      
      for (const operation of operations) {
        vi.spyOn(api as any, 'request').mockResolvedValue({ success: true });
        
        const result = await api.controlRss(feedId, operation);
        
        expect((api as any).request).toHaveBeenCalledWith('/rss/controlrss', {
          method: 'POST',
          body: JSON.stringify({
            feed_id: feedId,
            operation,
          }),
        });
        expect(result).toEqual({ success: true });
      }
    });
  });
}); 