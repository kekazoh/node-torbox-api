# node-torbox-api

Unofficial Node.js client for the Torbox API. Provides a fully typed interface for interacting with Torbox's torrent, usenet, web download, and RSS services.

## [WIP]
**IMPORTANT** This is a work in progress. It might be incomplete and some things haven't been tested yet, so it might be buggy. 

## Features

- 🔒 Fully typed TypeScript API client
- 📦 Complete API coverage (torrents, usenet, web downloads, RSS)
- 🚀 Promise-based async methods
- 💪 Built-in TypeScript type definitions
- 🔄 Automatic request handling and error parsing

## Installation

```bash
npm install node-torbox-api
```

## Quick Start

```typescript
import { TorboxClient } from 'node-torbox-api';

const client = new TorboxClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.torbox.app' // Optional, defaults to this URL
});

// Example: Get user profile
const profile = await client.users.getProfile();

// Example: Create a torrent download
const torrent = await client.torrents.createTorrent({
  magnet: 'magnet:?xt=urn:btih:...',
  name: 'My Download'
});
```

## API Services

### Torrents API
```typescript
// Create a torrent download
await client.torrents.createTorrent({
  magnet: 'magnet:?xt=urn:btih:...',
  name: 'Optional Name'
});

// Get torrent list
const torrents = await client.torrents.getTorrentList();

// Control torrent
await client.torrents.controlTorrent(torrentId, 'pause');
```

### Web Downloads API
```typescript
// Create web download
await client.web.createWebDownload({
  url: 'https://example.com/file.zip',
  name: 'Optional Name'
});

// Get download list
const downloads = await client.web.getDownloadList();
```

### Usenet API
```typescript
// Create usenet download
await client.usenet.createUsenetDownload({
  url: 'nzb-url',
  name: 'Optional Name'
});

// Get usenet downloads
const usenetDownloads = await client.usenet.getDownloadList();
```

### RSS API
```typescript
// Add RSS feed
await client.rss.addRss({
  url: 'https://example.com/feed.xml',
  name: 'My Feed',
  regex: '.*720p.*'
});
```

### User API
```typescript
// Get user profile
const profile = await client.users.getProfile();

// Refresh token
await client.users.refreshToken();
```

## Response Types

All API methods return a standardized response format:

```typescript
interface StandardResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Error Handling

```typescript
try {
  await client.torrents.createTorrent({
    magnet: 'invalid-magnet'
  });
} catch (error) {
  console.error('API Error:', error.message);
}
```

## Available Interfaces

The module exports all TypeScript interfaces for use in your application:

- `TorrentInfo`
- `WebDownloadInfo`
- `UsenetDownloadInfo`
- `ServerStatus`
- `Notification`
- And many more...

## License

Apache-2.0

## Support

For support, please visit [Torbox Support](https://support.torbox.app/) or open an issue on GitHub.
