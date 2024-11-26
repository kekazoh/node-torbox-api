import { TorboxConfig } from './interfaces.js';
import { TorrentsAPI } from './api/torrents-api.js';
import { UserAPI } from './api/user-api.js';
import { WebAPI } from './api/web-api.js';
import { UsenetAPI } from './api/usenet-api.js';
import { RssAPI } from './api/rss-api.js';
import { GeneralAPI } from './api/general-api.js';
import { NotificationsAPI } from './api/notifications-api.js';

export class TorboxClient {
  public torrents: TorrentsAPI;
  public user: UserAPI;
  public web: WebAPI;
  public usenet: UsenetAPI;
  public rss: RssAPI;
  public general: GeneralAPI;
  public notifications: NotificationsAPI;

  constructor(config: TorboxConfig) {
    this.torrents = new TorrentsAPI(config);
    this.user = new UserAPI(config);
    this.web = new WebAPI(config);
    this.usenet = new UsenetAPI(config);
    this.rss = new RssAPI(config);
    this.general = new GeneralAPI(config);
    this.notifications = new NotificationsAPI(config);
  }
}
