<template>
  <div class="poll">
    <v-container>
      <v-row>
        <v-col class="my-4">
          <v-card>
            <v-col class="pa-4" v-if="poll !== undefined">
              <Poll v-bind="options" @voted="addVote" />
            </v-col>
            <v-col class="text-center" v-else>
              <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Poll from '@/components/Poll.vue';
import { Component, Vue } from 'vue-property-decorator';
import { PollDto } from '../api/api.interface';

@Component({
  name: 'PollDetail',
  components: {
    Poll,
  },
  data() {
    return {
      poll: undefined,
    };
  },
  mounted() {
    const id = this.$route.params.pollId;
    this.$store
      .dispatch('poll/fetchPoll', id)
      .then((poll) => {
        (this as any).poll = poll;
      })
      .catch((err) => {
        console.error(err);
        this.$router.push({ path: '/polls' });
      });
  },
})
export default class PollDetail extends Vue {
  public poll?: PollDto;

  get options() {
    if (this.poll !== undefined) {
      console.log('re-render?', {
        question: this.poll.title,
        finalResults: this.poll.voted,
        answers: this.poll.options.map((option) => ({
          value: option.optionId,
          text: option.text,
          votes: option.count,
          ...(option.voted !== undefined && { selected: option.voted }),
        })),
      });
      return {
        question: this.poll.title,
        finalResults: this.poll.voted,
        answers: this.poll.options.map((option) => ({
          value: option.optionId,
          text: option.text,
          votes: option.count,
          ...(option.voted !== undefined && { selected: option.voted }),
        })),
      };
    }
    return null;
  }

  addVote(obj: any) {
    this.$store.dispatch('poll/vote', obj.value).then((result) => {
      this.poll = result;
    });
  }
}
</script>
