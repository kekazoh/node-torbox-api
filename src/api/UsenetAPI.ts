import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

interface UsenetDownloadInfo {
  id: number;
  created_at: string;
  updated_at: string;
  nzb_data: string;
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
  files: UsenetFile[];
}

interface UsenetFile {
  id: number;
  md5: string;
  s3_path: string;
  name: string;
  size: number;
  mimetype: string;
  short_name: string;
}

interface CreateUsenetDownloadOptions {
  file?: Blob; // NZB file
  url?: string; // NZB URL
  name?: string;
  as_queued?: boolean;
}

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