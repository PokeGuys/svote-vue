import pollApi from '@/api/poll.api';
import { PollDto } from '../../api/api.interface';

export type PollDictionary = {
  [key: string]: PollDto;
};

export type PollState = {
  pollDictionary: PollDictionary;
};

export default {
  namespaced: true,
  state: {
    pollDictionary: {},
  },
  mutations: {
    setPolls: (state: PollState, pollDict: PollDictionary) => {
      state.pollDictionary = pollDict;
    },
    clean: (state: PollState) => {
      state.pollDictionary = {};
    },
  },
  getters: {
    polls: (state: PollState) => Object.values(state.pollDictionary),
  },
  actions: {
    fetchPolls({ commit }: any, page = 1) {
      return new Promise((resolve, reject) => {
        pollApi
          .fetchPolls(page)
          .then(({ items: polls }) => {
            const pollDict = polls.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as any);
            commit('setPolls', pollDict);
            resolve(pollDict);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },
    fetchPoll(_context: any, pollId: string) {
      return new Promise((resolve, reject) => {
        pollApi
          .fetchPoll(pollId)
          .then((poll) => resolve(poll))
          .catch((err: any) => {
            console.error(err);
            reject(err);
          });
      });
    },
    createPoll({ commit }: any, { title, startAt, endAt, options }: any) {
      return new Promise((resolve, reject) => {
        pollApi
          .createPoll(title, startAt, endAt, options)
          .then((poll) => {
            commit('setPoll', poll);
            resolve(poll);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },
    vote(_context: any, optionId: string) {
      return new Promise((resolve, reject) => {
        pollApi
          .vote(optionId)
          .then((result: any) => resolve(result))
          .catch((err: any) => {
            reject(err);
          });
      });
    },
  },
};
