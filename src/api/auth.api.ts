import { apiAxios } from '@/plugins/api';
import { AuthPayloadDto } from './api.interface';

export const AUTH_ENDPOINT = '/auth';
export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh';

export default {
  async authenticate(hkid: string): Promise<AuthPayloadDto> {
    return apiAxios
      .post<AuthPayloadDto>(AUTH_ENDPOINT, { hkid })
      .then((resp) => resp.data);
  },
  async refresh(refreshToken: string): Promise<AuthPayloadDto> {
    return apiAxios
      .post<AuthPayloadDto>(REFRESH_TOKEN_ENDPOINT, { refreshToken })
      .then((resp) => resp.data);
  },
};
