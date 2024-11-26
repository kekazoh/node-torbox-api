import { BaseClient, TorboxError } from './base.js';
import { StandardResponse } from '../interfaces.js';
import { CacheResult, CreateTorrentOptions, CreateTorrentResult, SearchTorrentResult, TorrentInfo } from './interfaces.js';
import assert from 'assert';
export class TorrentsAPI extends BaseClient {
  // Torrents API
  async createTorrent(
    options: CreateTorrentOptions,
  ): Promise<StandardResponse<CreateTorrentResult>> {
    const formData = new FormData();
    assert(
      options.file || options.magnet,
      '`file` or `magnet` option must be set',
    );
    if (options.file) {
      formData.append('file', new Blob([options.file]));
    }
    if (options.magnet) {
      formData.append('magnet', options.magnet);
    }
    // Fix: Check for undefined instead of truthy values for boolean options
    if (options.seed !== undefined) {
      formData.append('seed', options.seed.toString());
    }
    if (options.allow_zip !== undefined) {
      formData.append('allow_zip', options.allow_zip.toString());
    }
    if (options.name) {
      formData.append('name', options.name);
    }
    if (options.as_queued !== undefined) {
      formData.append('as_queued', options.as_queued.toString());
    }

    return this.request('/torrents/createtorrent', {
      method: 'POST',
      body: formData,
    });
  }

  async controlTorrent(
    torrentId: number,
    operation: 'reannounce' | 'delete' | 'resume' | 'pause',
  ): Promise<StandardResponse> {
    return this.request('/torrents/controltorrent', {
      method: 'POST',
      body: JSON.stringify({
        torrent_id: torrentId,
        operation,
      }),
    });
  }

  async controlQueuedTorrent(
    queuedId: number,
    operation: 'delete',
  ): Promise<StandardResponse> {
    return this.request('/torrents/controlqueued', {
      method: 'POST',
      body: JSON.stringify({
        queued_id: queuedId,
        operation,
      }),
    });
  }

  async requestDownloadLink(params: {
    torrent_id: number;
    file_id?: number;
    zip_link?: boolean;
    torrent_file?: boolean;
  }): Promise<StandardResponse<string>> {
    return this.request('/torrents/requestdl', { params: { ...params, token: this.apiKey } });
  }

  async getTorrentList(params?: {
    bypass_cache?: boolean;
    id?: number;
    offset?: number;
    limit?: number;
  }): Promise<StandardResponse<TorrentInfo[]>> {
    try {
      return this.request('/torrents/mylist', { params });
    } catch (error) {
      if (error instanceof TorboxError && error.status === 404) {
        return {
          ...error.response,
          data: [],
        };
      } else throw error;
    }
  }

  async checkCached(params: {
    hash: string;
    format?: 'object' | 'list';
    list_files?: boolean;
  }): Promise<StandardResponse<CacheResult[] | Record<string, CacheResult>>> {
    return this.request('/torrents/checkcached', { params });
  }

  async searchTorrents(query: string): Promise<StandardResponse<SearchTorrentResult[]>> {
    return this.request('/torrents/search', { params: { query } });
  }

  async exportTorrentData(
    torrentId: number,
    type: 'magnet' | 'file',
  ): Promise<StandardResponse | Blob> {
    const queryString = this.buildQueryString({ torrent_id: torrentId, type });
    const response = await fetch(
      `${this.baseURL}/v1/api/torrents/exportdata${queryString}`,
      {
        headers: this.headers,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return type === 'magnet' ? response.json() : response.blob();
  }

  async getTorrentInfo(params: {
    hash: string;
    timeout?: number;
  }): Promise<StandardResponse> {
    return this.request(`/torrents/torrentinfo`, { params });
  }
}
