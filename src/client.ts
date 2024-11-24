import { TorboxConfig } from './interfaces.js';
import { TorrentsAPI } from './api/TorrentsApi.js';
import { UserAPI } from './api/UserApi.js';
import { WebAPI } from './api/WebApi.js';
import { UsenetAPI } from './api/UsenetApi.js';
import { RssAPI } from './api/RssApi.js';

export class TorboxClient {
  public torrents: TorrentsAPI;
  public users: UserAPI;
  public web: WebAPI;
  public usenet: UsenetAPI;
  public rss: RssAPI;

  constructor(config: TorboxConfig) {
    this.torrents = new TorrentsAPI(config);
    this.users = new UserAPI(config);
    this.web = new WebAPI(config);
    this.usenet = new UsenetAPI(config);
    this.rss = new RssAPI(config);
  }
}
