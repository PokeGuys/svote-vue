import axios from 'axios';
import { Store } from 'vuex';

export const apiAxios = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT || '',
});

export default function setupAxios(store: Store<any>) {
  apiAxios.interceptors.request.use((config) => {
    const idToken = store.state.auth.accessToken;
    if (idToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${idToken}`;
    }

    return config;
  });
}
