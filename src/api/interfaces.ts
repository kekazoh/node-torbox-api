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

export interface CacheFile {
  name: string;
  size: number;
}

export interface CacheResult {
  hash: string;
  name: string;
  size: number;
  files?: CacheFile[];
}

export interface SearchTorrentResult {
  id: string;
  name: string;
  categories: string[];
  hash: string;
  size: number;
  magnet: string;
  torrent_file: string;
  preferred_type: string;
  website: string;
  source: string;
  peers: number;
  seeders: number;
  updated_at: string;
}

export interface CreateTorrentResult {
  torrent_id: number;
  name: string;
  hash: string;
}
