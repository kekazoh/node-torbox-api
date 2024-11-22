import { TorboxConfig } from './interfaces.js';
import { TorrentsAPI } from './api/TorrentsAPI.js';
import { UserAPI } from './api/UserAPI.js';
import { WebAPI } from './api/WebAPI.js';
import { UsenetAPI } from './api/UsenetAPI.js';
import { RssAPI } from './api/RssAPI.js';

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