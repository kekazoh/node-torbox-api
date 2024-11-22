import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';
import { CreateWebDownloadOptions, WebDownloadInfo } from './interfaces.js';

export class WebAPI extends BaseClient {
  async createWebDownload(options: CreateWebDownloadOptions): Promise<StandardResponse> {
    const formData = new FormData();
    formData.append('url', options.url);

    if (options.name) {
      formData.append('name', options.name);
    }
    if (typeof options.as_queued === 'boolean') {
      formData.append('as_queued', options.as_queued.toString());
    }

    return this.request('/webdl/createwebdownload', {
      method: 'POST',
      body: formData,
    });
  }

  async controlWebDownload(
    downloadId: number,
    operation: 'delete' | 'resume' | 'pause'
  ): Promise<StandardResponse> {
    return this.request('/webdl/controlwebdownload', {
      method: 'POST',
      body: JSON.stringify({
        download_id: downloadId,
        operation,
      }),
    });
  }

  async controlQueuedDownload(
    queuedId: number,
    operation: 'delete'
  ): Promise<StandardResponse> {
    return this.request('/webdl/controlqueued', {
      method: 'POST',
      body: JSON.stringify({
        queued_id: queuedId,
        operation,
      }),
    });
  }

  async requestDownloadLink(params: {
    download_id: number;
    file_id?: number;
    zip_link?: boolean;
  }): Promise<StandardResponse<string>> {
    return this.request('/webdl/requestdl', {
      method: 'GET',
      params,
    });
  }

  async getDownloadList(params?: {
    bypass_cache?: boolean;
    id?: number;
    offset?: number;
    limit?: number;
  }): Promise<StandardResponse<WebDownloadInfo[]>> {
    return this.request('/webdl/mylist', {
      method: 'GET',
      params,
    });
  }

  async checkUrl(url: string): Promise<StandardResponse> {
    return this.request('/webdl/checkurl', {
      method: 'GET',
      params: { url },
    });
  }
} 