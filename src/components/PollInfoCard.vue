<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ poll.title }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span class="summary" v-if="!poll.isEnded">Closes {{ dateTime(poll.endAt) }}</span>
          <span class="summary" v-else>Already Closed</span>
        </v-col>
        <v-col cols="12" v-if="poll.voted">
          <span class="summary">✔ You answered this poll</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="navigatePoll(poll.id)">
        {{ poll.voted ? 'See Result' : 'Answer Poll' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PollDto } from '../api/api.interface';

@Component
export default class PollInfoCard extends Vue {
  @Prop() private readonly poll!: PollDto;

  navigatePoll(pollId: string) {
    this.$router.push({ path: `/polls/${pollId}` });
  }

  dateTime(ts: number) {
    return this.$dayjs.unix(ts).fromNow();
  }
}
</script>
