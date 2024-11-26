import { BaseClient } from './base.js';
import { StandardResponse } from '../interfaces.js';
import { ServerStatus } from './interfaces.js';

export class GeneralAPI extends BaseClient {
  async getStats(): Promise<StandardResponse<ServerStatus[]>> {
    return this.request('/stats', {
      method: 'GET',
    });
  }

  async health(): Promise<StandardResponse<null>> {
    const response = await fetch(this.baseURL);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('API is down');
    }
  }
}
