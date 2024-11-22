import { BaseClient } from './base.js';
import { StandardResponse } from '../interfaces.js';
import { CreateUsenetDownloadOptions, UsenetDownloadInfo } from './interfaces.js';

export class UsenetAPI extends BaseClient {
  async createUsenetDownload(options: CreateUsenetDownloadOptions): Promise<StandardResponse> {
    const formData = new FormData();

    if (options.file) {
      formData.append('file', options.file);
    }
    if (options.url) {
      formData.append('url', options.url);
    }
    if (options.name) {
      formData.append('name', options.name);
    }
    if (typeof options.as_queued === 'boolean') {
      formData.append('as_queued', options.as_queued.toString());
    }

    return this.request('/usenet/createusenetdownload', {
      method: 'POST',
      body: formData,
    });
  }

  async controlUsenetDownload(
    downloadId: number,
    operation: 'delete' | 'resume' | 'pause'
  ): Promise<StandardResponse> {
    return this.request('/usenet/controlusenetdownload', {
      method: 'POST',
      body: JSON.stringify({
        download_id: downloadId,
        operation,
      }),
    });
  }

  async requestDownloadLink(params: {
    download_id: number;
    file_id?: number;
    zip_link?: boolean;
  }): Promise<StandardResponse<string>> {
    return this.request('/usenet/requestdl', {
      method: 'GET',
      params,
    });
  }

  async getDownloadList(params?: {
    bypass_cache?: boolean;
    id?: number;
    offset?: number;
    limit?: number;
  }): Promise<StandardResponse<UsenetDownloadInfo[]>> {
    return this.request('/usenet/mylist', {
      method: 'GET',
      params,
    });
  }
} 