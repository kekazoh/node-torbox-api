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