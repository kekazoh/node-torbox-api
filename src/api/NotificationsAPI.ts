import { BaseClient } from './BaseClient.js';
import { StandardResponse } from '../interfaces.js';

interface Notification {
  id: number;
  created_at: string;
  title: string;
  message: string;
  auth_id: string;
}

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