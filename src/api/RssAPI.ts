import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

interface RssFeedOptions {
  url: string;
  name?: string;
  regex?: string;
  as_queued?: boolean;
}

export class RssAPI extends BaseClient {

  async addRss(options: RssFeedOptions): Promise<StandardResponse> {
    return this.request('/rss/addrss', {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }

  async modifyRss(feedId: number, options: Partial<RssFeedOptions>): Promise<StandardResponse> {
    return this.request('/rss/modifyrss', {
      method: 'POST',
      body: JSON.stringify({
        feed_id: feedId,
        ...options
      })
    });
  }

  async controlRss(feedId: number, operation: 'delete' | 'pause' | 'resume'): Promise<StandardResponse> {
    return this.request('/rss/controlrss', {
      method: 'POST',
      body: JSON.stringify({
        feed_id: feedId,
        operation
      })
    });
  }
} 