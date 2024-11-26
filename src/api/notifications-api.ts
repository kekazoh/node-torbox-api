import { BaseClient } from './base.js';
import { StandardResponse } from '../interfaces.js';
import { Notification } from './interfaces.js';

export class NotificationsAPI extends BaseClient {
  async getNotifications(): Promise<StandardResponse<Notification[]>> {
    return this.request('/notifications/mynotifications', {
      method: 'GET',
    });
  }

  async getRssFeed(token: string): Promise<StandardResponse<unknown>> {
    return this.request('/notifications/rss', {
      method: 'GET',
      params: { token },
    });
  }

  async clearAllNotifications(): Promise<StandardResponse> {
    return this.request('/notifications/clear', {
      method: 'POST',
    });
  }

  async clearNotification(notificationId: number): Promise<StandardResponse> {
    return this.request(`/notifications/clear/${notificationId}`, {
      method: 'POST',
    });
  }

  async sendTestNotification(): Promise<StandardResponse> {
    return this.request('/notifications/test', {
      method: 'POST',
    });
  }
}
