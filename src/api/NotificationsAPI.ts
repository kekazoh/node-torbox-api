import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';
import { Notification } from './interfaces.js';

export class NotificationsAPI extends BaseClient {
  async getNotifications(): Promise<StandardResponse<Notification[]>> {
    return this.request('/api/notifications/mynotifications', {
      method: 'GET'
    });
  }

  async getRssFeed(token: string): Promise<StandardResponse<unknown>> {
    return this.request('/api/notifications/rss', {
      method: 'GET',
      params: { token }
    });
  }

  async clearAllNotifications(): Promise<StandardResponse> {
    return this.request('/api/notifications/clear', {
      method: 'POST'
    });
  }

  async clearNotification(notificationId: number): Promise<StandardResponse> {
    return this.request(`/api/notifications/clear/${notificationId}`, {
      method: 'POST'
    });
  }

  async sendTestNotification(): Promise<StandardResponse> {
    return this.request('/api/notifications/test', {
      method: 'POST'
    });
  }
} 