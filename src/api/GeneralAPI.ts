import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

interface ServerStatus {
  server_id: number;
  server_name: string;
  server_location: string;
  server_status: string;
  server_load: number;
  server_downloads: number;
}

export class GeneralAPI extends BaseClient {
  async getStats(): Promise<StandardResponse<ServerStatus[]>> {
    return this.request('/api/stats', {
      method: 'GET'
    });
  }
}