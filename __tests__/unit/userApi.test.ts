import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserAPI } from '../../src/api/userApi.js';
import { StandardResponse } from '../../src/interfaces.js';
import { mockConfig } from '../mocks/config.js';

describe('UserAPI', () => {
  let api: UserAPI;
  const mockResponse: StandardResponse = { 
    success: true,
    detail: 'test',
    data: {}
  };

  beforeEach(() => {
    api = new UserAPI(mockConfig);
    // Type assertion to access protected method
    (api as any).request = vi.fn().mockResolvedValue(mockResponse);
  });

  describe('getProfile', () => {
    it('should fetch user profile without settings', async () => {
      const result = await api.getProfile();
      expect((api as any).request).toHaveBeenCalledWith('/user/me', {
        method: 'GET',
        params: { settings: false }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should fetch user profile with settings', async () => {
      const result = await api.getProfile(true);
      
      expect((api as any).request).toHaveBeenCalledWith('/user/me', {
        method: 'GET',
        params: { settings: true }
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshToken', () => {
    it('should refresh user token', async () => {
      const result = await api.refreshToken();
      
      expect((api as any).request).toHaveBeenCalledWith('/user/refreshtoken', {
        method: 'POST'
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addReferral', () => {
    it('should add referral code', async () => {
      const referralCode = 'TEST123';
      const result = await api.addReferral(referralCode);
      
      expect((api as any).request).toHaveBeenCalledWith('/user/addreferral', {
        method: 'POST',
        params: { referral: referralCode }
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 