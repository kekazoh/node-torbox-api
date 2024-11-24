import { TorboxConfig, StandardResponse } from '../interfaces.js';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class BaseClient {
  protected baseURL: string;
  protected headers: HeadersInit;

  constructor(config: TorboxConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }
    this.baseURL = config.baseURL || 'https://api.torbox.app';
    this.headers = {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  protected async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<StandardResponse<T>> {
    const { params = {}, ...fetchOptions } = options;
    const queryString = this.buildQueryString(params);
    const url = `${this.baseURL}/v1/api${endpoint}${queryString}`;

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...this.headers,
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  }

  protected buildQueryString(
    params: Record<string, string | number | boolean | undefined>,
  ): string {
    const query = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return query ? `?${query}` : '';
  }
}
