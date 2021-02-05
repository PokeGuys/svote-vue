import authApi from '@/api/auth.api';
import jwtDecode from '../../util/jwt';

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  refreshTask?: number;
};

export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    refreshTask: undefined,
  },
  mutations: {
    setToken: (state: AuthState, token: string) => {
      state.accessToken = token;
    },
    setRefreshToken: (state: AuthState, refreshToken: string) => {
      state.refreshToken = refreshToken;
    },
    setRefreshTask: (state: AuthState, task: number) => {
      state.refreshTask = task;
    },
    clean: (state: AuthState) => {
      clearTimeout(state.refreshTask);
      state.accessToken = '';
      state.refreshToken = '';
      state.refreshTask = 0;
    },
  },
  actions: {
    async login({ commit, dispatch }: any, hkid: string) {
      return new Promise((resolve, reject) => {
        authApi
          .authenticate(hkid)
          .then(({ token, refreshToken }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refreshToken);
            commit('setToken', token);
            commit('setRefreshToken', refreshToken);
            dispatch('autoRefresh');
            resolve(token);
          })
          .catch((err) => {
            dispatch('signOut');
            reject(err);
          });
      });
    },
    async init({ state, dispatch }: any) {
      if (state.accessToken !== '') {
        dispatch('autoRefresh');
      }
    },
    async refreshTokens({ state, dispatch, commit }: any) {
      return new Promise((resolve, reject) => {
        authApi
          .refresh(state.refreshToken)
          .then(({ token, refreshToken }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refreshToken);
            commit('setToken', token);
            commit('setRefreshToken', refreshToken);
            dispatch('autoRefresh');
            resolve(token);
          })
          .catch((err) => {
            dispatch('signOut');
            reject(err);
          });
      });
    },
    autoRefresh({ state, commit, dispatch }: any) {
      const { accessToken, refreshTask: oldTask } = state;
      const { exp } = jwtDecode(accessToken);
      const now = Date.now() / 1000;
      clearTimeout(oldTask);
      let timeUntilRefresh = exp - now;
      timeUntilRefresh -= 45 * 60;
      const refreshTask = setTimeout(() => dispatch('refreshTokens'), timeUntilRefresh * 1000);
      commit('setRefreshTask', refreshTask);
    },
    signOut({ commit }: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      commit('clean');
    },
  },
};
