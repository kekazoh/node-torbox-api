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
