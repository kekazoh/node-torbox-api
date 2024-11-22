import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

export class UserAPI extends BaseClient {
  async getProfile(settings: boolean = false): Promise<StandardResponse> {
    return this.request('/user/me', {
      method: 'GET',
      params: { settings }
    });
  }

  async refreshToken(): Promise<StandardResponse> {
    return this.request('/user/refreshtoken', {
      method: 'POST'
    });
  }

  async addReferral(referral: string): Promise<StandardResponse> {
    return this.request('/user/addreferral', {
      method: 'POST',
      params: { referral }
    });
  }
} 