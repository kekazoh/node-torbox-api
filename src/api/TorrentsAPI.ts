import { BaseClient } from './BaseClient.js';
import { CreateTorrentOptions, StandardResponse, TorrentInfo } from '../interfaces.js';

export class TorrentsAPI extends BaseClient {
      // Torrents API
  async createTorrent(options: CreateTorrentOptions): Promise<StandardResponse> {
    const formData = new FormData();

    if (options.file) {
      formData.append('file', new Blob([options.file]));
    }
    if (options.magnet) {
      formData.append('magnet', options.magnet);
    }
    if (options.seed) {
      formData.append('seed', options.seed.toString());
    }
    if (typeof options.allow_zip === 'boolean') {
      formData.append('allow_zip', options.allow_zip.toString());
    }
    if (options.name) {
      formData.append('name', options.name);
    }
    if (typeof options.as_queued === 'boolean') {
      formData.append('as_queued', options.as_queued.toString());
    }

    return this.request('/torrents/createtorrent', {
      method: 'POST',
      headers: {
        // Remove default Content-Type as FormData sets its own
        'Content-Type': undefined,
      },
      body: formData,
    });
  }

  async controlTorrent(
    torrentId: number, 
    operation: 'reannounce' | 'delete' | 'resume' | 'pause'
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
    operation: 'delete'
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
    const queryString = this.buildQueryString(params);
    return this.request(`/torrents/requestdl${queryString}`);
  }

  async getTorrentList(params?: {
    bypass_cache?: boolean;
    id?: number;
    offset?: number;
    limit?: number;
  }): Promise<StandardResponse<TorrentInfo[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request(`/torrents/mylist${queryString}`);
  }

  async checkCached(params: {
    hash: string;
    format?: 'object' | 'list';
    list_files?: boolean;
  }): Promise<StandardResponse> {
    const queryString = this.buildQueryString(params);
    return this.request(`/torrents/checkcached${queryString}`);
  }

  async searchTorrents(query: string): Promise<StandardResponse> {
    return this.request(`/torrents/search?query=${encodeURIComponent(query)}`);
  }

  async exportTorrentData(
    torrentId: number,
    type: 'magnet' | 'file'
  ): Promise<StandardResponse | Blob> {
    const queryString = this.buildQueryString({ torrent_id: torrentId, type });
    const response = await fetch(
      `${this.baseURL}/v1/api/torrents/exportdata${queryString}`,
      {
        headers: this.headers,
      }
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
    const queryString = this.buildQueryString(params);
    return this.request(`/torrents/torrentinfo${queryString}`);
  }
} 