declare module 'node-torbox-api' {
  export interface TorboxConfig {
    baseURL?: string;
    apiKey: string;
    version?: string;
  }

  export interface StandardResponse<T = unknown> {
    success: boolean;
    error?: string | null;
    detail: string;
    data: T;
  }

  export interface TorrentInfo {
    id: number;
    hash: string;
    created_at: string;
    updated_at: string;
    magnet: string;
    size: number;
    active: boolean;
    auth_id: string;
    download_state: string;
    seeds: number;
    peers: number;
    ratio: number;
    progress: number;
    download_speed: number;
    upload_speed: number;
    name: string;
    eta: number;
    server: number;
    torrent_file: boolean;
    expires_at: string;
    download_present: boolean;
    download_finished: boolean;
    files: TorrentFile[];
    inactive_check: number;
    availability: number;
  }

  export interface TorrentFile {
    id: number;
    md5: string;
    s3_path: string;
    name: string;
    size: number;
    mimetype: string;
    short_name: string;
  }

  export interface CreateTorrentOptions {
    file?: Buffer;
    magnet?: string;
    seed?: 1 | 2 | 3;
    allow_zip?: boolean;
    name?: string;
    as_queued?: boolean;
  }

  export interface CreateUsenetOptions {
    file?: Buffer;
    magnet?: string;
  }

  export interface CreateRssOptions {
    url: string;
    name?: string;
    regex?: string;
    as_queued?: boolean;
  }

  export interface CreateUserOptions {
    username: string;
    password: string;
    email: string;
  }

  export interface ServerStatus {
    server_id: number;
    server_name: string;
    server_location: string;
    server_status: string;
    server_load: number;
    server_downloads: number;
  }

  export interface Notification {
    id: number;
    created_at: string;
    title: string;
    message: string;
    auth_id: string;
  }

  export interface RssFeedOptions {
    url: string;
    name?: string;
    regex?: string;
    as_queued?: boolean;
  }

  export interface UsenetDownloadInfo {
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

  export interface UsenetFile {
    id: number;
    md5: string;
    s3_path: string;
    name: string;
    size: number;
    mimetype: string;
    short_name: string;
  }

  export interface CreateUsenetDownloadOptions {
    file?: Blob; // NZB file
    url?: string; // NZB URL
    name?: string;
    as_queued?: boolean;
  }

  export interface WebDownloadInfo {
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

  export interface WebFile {
    id: number;
    md5: string;
    s3_path: string;
    name: string;
    size: number;
    mimetype: string;
    short_name: string;
  }

  export interface CreateWebDownloadOptions {
    url: string;
    name?: string;
    as_queued?: boolean;
  }

  export interface TorrentsAPI {
    createTorrent(options: CreateTorrentOptions): Promise<StandardResponse>;
    controlTorrent(
      torrentId: number,
      operation: 'delete' | 'resume' | 'pause',
    ): Promise<StandardResponse>;
    controlQueuedTorrent(
      queuedId: number,
      operation: 'delete',
    ): Promise<StandardResponse>;
    requestDownloadLink(params: {
      download_id: number;
      file_id?: number;
      zip_link?: boolean;
    }): Promise<StandardResponse<string>>;
    getTorrentList(params?: {
      bypass_cache?: boolean;
      id?: number;
      offset?: number;
      limit?: number;
    }): Promise<StandardResponse<TorrentInfo[]>>;
    searchTorrents(query: string): Promise<StandardResponse>;
    exportTorrentData(
      torrentId: number,
      type: 'magnet' | 'file',
    ): Promise<StandardResponse | Blob>;
    getTorrentInfo(params: {
      hash: string;
      timeout?: number;
    }): Promise<StandardResponse>;
    checkCached(params: {
      hash: string;
      format?: 'object' | 'list';
      list_files?: boolean;
    }): Promise<StandardResponse>;
  }

  export interface UserAPI {
    getProfile(settings?: boolean): Promise<StandardResponse>;
    refreshToken(): Promise<StandardResponse>;
    addReferral(referral: string): Promise<StandardResponse>;
  }

  export interface WebAPI {
    createWebDownload(
      options: CreateWebDownloadOptions,
    ): Promise<StandardResponse>;
    controlWebDownload(
      downloadId: number,
      operation: 'delete' | 'resume' | 'pause',
    ): Promise<StandardResponse>;
    requestDownloadLink(params: {
      download_id: number;
      file_id?: number;
      zip_link?: boolean;
    }): Promise<StandardResponse<string>>;
    getDownloadList(params?: {
      bypass_cache?: boolean;
      id?: number;
      offset?: number;
      limit?: number;
    }): Promise<StandardResponse<WebDownloadInfo[]>>;
    controlQueuedDownload(
      queuedId: number,
      operation: 'delete',
    ): Promise<StandardResponse>;
    checkUrl(url: string): Promise<StandardResponse>;
  }

  export interface UsenetAPI {
    createUsenetDownload(
      options: CreateUsenetDownloadOptions,
    ): Promise<StandardResponse>;
    controlUsenetDownload(
      downloadId: number,
      operation: 'delete' | 'resume' | 'pause',
    ): Promise<StandardResponse>;
    requestDownloadLink(params: {
      download_id: number;
      file_id?: number;
      zip_link?: boolean;
    }): Promise<StandardResponse<string>>;
    getDownloadList(params?: {
      bypass_cache?: boolean;
      id?: number;
      offset?: number;
      limit?: number;
    }): Promise<StandardResponse<UsenetDownloadInfo[]>>;
  }

  export interface RssAPI {
    addRss(options: RssFeedOptions): Promise<StandardResponse>;
    modifyRss(
      feedId: number,
      options: Partial<RssFeedOptions>,
    ): Promise<StandardResponse>;
    controlRss(
      feedId: number,
      operation: 'delete' | 'pause' | 'resume',
    ): Promise<StandardResponse>;
  }

  export interface GeneralAPI {
    getStats(): Promise<StandardResponse<ServerStatus[]>>;
    health(): StandardResponse<null>;
  }

  export interface NotificationsAPI {
    getNotifications(): Promise<StandardResponse<Notification[]>>;
    getRssFeed(token: string): Promise<StandardResponse<unknown>>;
    clearAllNotifications(): Promise<StandardResponse>;
    clearNotification(notificationId: number): Promise<StandardResponse>;
    sendTestNotification(): Promise<StandardResponse>;
  }

  export class TorboxAPI {
    constructor(config: TorboxConfig);

    torrents: TorrentsAPI;
    users: UserAPI;
    web: WebAPI;
    usenet: UsenetAPI;
    rss: RssAPI;
    general: GeneralAPI;
    notifications: NotificationsAPI;
  }
}
