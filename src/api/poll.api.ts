import { apiAxios } from '@/plugins/api';
import { PollDto, PollListPayloadDto } from './api.interface';

export const POLL_BASE_ENDPOINT = '/polls';

export default {
  async fetchPolls(page: number): Promise<PollListPayloadDto> {
    return apiAxios
      .get<PollListPayloadDto>(POLL_BASE_ENDPOINT, { params: { page } })
      .then((resp) => resp.data);
  },
  async fetchPoll(pollId: string): Promise<PollDto> {
    return apiAxios.get<PollDto>(`${POLL_BASE_ENDPOINT}/${pollId}`).then((resp) => resp.data);
  },
  async createPoll(
    title: string,
    startAt: number,
    endAt: number,
    options: string[],
  ): Promise<PollDto> {
    return apiAxios
      .post<PollDto>(POLL_BASE_ENDPOINT, {
        title,
        startAt,
        endAt,
        options,
      })
      .then((resp) => resp.data);
  },
  async vote(optionId: string) {
    return apiAxios.post(`${POLL_BASE_ENDPOINT}/${optionId}/vote`).then((resp) => resp.data);
  },
};
