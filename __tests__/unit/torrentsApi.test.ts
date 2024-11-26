import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TorrentsAPI } from '../../src/api/torrentsApi.js';
import { mockConfig } from '../mocks/config.js';

describe('TorrentsAPI', () => {
  let api: TorrentsAPI;
  const mockResponse = { success: true };

  beforeEach(() => {
    api = new TorrentsAPI(mockConfig);
    vi.spyOn(api as any, 'request').mockResolvedValue(mockResponse);
  });

  it('creates a torrent', async () => {
    const options = {
      file: Buffer.from([1, 2, 3]),
      magnet: 'magnet:link',
      seed: 1 as 1 | 2 | 3,
      allow_zip: true,
      name: 'test',
      as_queued: false
    };

    const result = await api.createTorrent(options);
    expect(result).toEqual(mockResponse);
  });

  it('controls a torrent', async () => {
    const result = await api.controlTorrent(123, 'pause');
    expect(result).toEqual(mockResponse);
  });

  it('controls a queued torrent', async () => {
    const result = await api.controlQueuedTorrent(123, 'delete');
    expect(result).toEqual(mockResponse);
  });

  it('requests download link', async () => {
    const params = { torrent_id: 123, zip_link: true };
    const result = await api.requestDownloadLink(params);
    expect(result).toEqual(mockResponse);
  });

  it('gets torrent list', async () => {
    const params = { bypass_cache: true, limit: 10 };
    const result = await api.getTorrentList(params);
    expect(result).toEqual(mockResponse);
  });

  it('checks cached torrents', async () => {
    const params = { hash: '123abc', format: 'object' as const };
    const result = await api.checkCached(params);
    expect(result).toEqual(mockResponse);
  });

  it('searches torrents', async () => {
    const result = await api.searchTorrents('test query');
    expect(result).toEqual(mockResponse);
  });

  it('exports torrent data as magnet', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await api.exportTorrentData(123, 'magnet');
    expect(result).toEqual(mockResponse);
  });

  it('exports torrent data as file', async () => {
    const mockBlob = new Blob(['test']);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });

    const result = await api.exportTorrentData(123, 'file');
    expect(result).toEqual(mockBlob);
  });

  it('gets torrent info', async () => {
    const params = { hash: '123abc', timeout: 30 };
    const result = await api.getTorrentInfo(params);
    expect(result).toEqual(mockResponse);
  });

  it('handles export torrent data error', async () => {
    const errorResponse = { error: 'Failed to export' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorResponse)
    });

    await expect(api.exportTorrentData(123, 'magnet')).rejects.toEqual(errorResponse);
  });
}); 