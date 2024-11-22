import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

interface WebDownloadInfo {
  id: number;
  created_at: string;
  updated_at: string;
  url: string;
  size: number;
  active: boolean;
  auth_id: string;
  download_state: string;
  progress: number;
  download_speed: number;
  name: string;
  eta: number;
  server: number;
  expires_at: string;
  download_present: boolean;
  download_finished: boolean;
  files: WebFile[];
}

interface WebFile {
  id: number;
  md5: string;
  s3_path: string;
  name: string;
  size: number;
  mimetype: string;
  short_name: string;
}

interface CreateWebDownloadOptions {
  url: string;
  name?: string;
  as_queued?: boolean;
}

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