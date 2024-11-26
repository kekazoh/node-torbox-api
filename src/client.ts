import { TorboxConfig } from './interfaces.js';
import { TorrentsAPI } from './api/torrentsApi.js';
import { UserAPI } from './api/userApi.js';
import { WebAPI } from './api/webApi.js';
import { UsenetAPI } from './api/usenetApi.js';
import { RssAPI } from './api/rssApi.js';
import { GeneralAPI } from './api/generalApi.js';
import { NotificationsAPI } from './api/notificationsApi.js';

export class TorboxClient {
  public torrents: TorrentsAPI;
  public users: UserAPI;
  public web: WebAPI;
  public usenet: UsenetAPI;
  public rss: RssAPI;
  public general: GeneralAPI;
  public notifications: NotificationsAPI;

  constructor(config: TorboxConfig) {
    this.torrents = new TorrentsAPI(config);
    this.users = new UserAPI(config);
    this.web = new WebAPI(config);
    this.usenet = new UsenetAPI(config);
    this.rss = new RssAPI(config);
    this.general = new GeneralAPI(config);
    this.notifications = new NotificationsAPI(config);
  }
}
