import { TorboxConfig } from './interfaces.js';
import { TorrentsAPI } from './api/TorrentsApi.js';
import { UserAPI } from './api/UserApi.js';
import { WebAPI } from './api/WebApi.js';
import { UsenetAPI } from './api/UsenetApi.js';
import { RssAPI } from './api/RssApi.js';
import { GeneralAPI } from './api/GeneralApi.js';
import { NotificationsAPI } from './api/NotificationsApi.js';

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
