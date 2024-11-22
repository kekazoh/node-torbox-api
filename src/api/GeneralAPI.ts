import { BaseClient } from './base.js';
import { StandardResponse } from '../interfaces.js';
import { ServerStatus } from './interfaces.js';

export class GeneralAPI extends BaseClient {
  async getStats(): Promise<StandardResponse<ServerStatus[]>> {
    return this.request('/api/stats', {
      method: 'GET'
    });
  }
}