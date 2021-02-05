<template>
  <div class="polls">
    <v-container>
      <v-row>
        <!-- TODO: Implement pagination -->
        <v-col v-for="(poll, idx) in polls" :key="idx" class="my-4" cols="12" xs="12" lg="6">
          <poll-info-card :poll="poll"></poll-info-card>
        </v-col>
        <v-col v-if="polls.length === 0" cols="12" xs="12">
          <p>There is no active poll right now.</p>
        </v-col>
        <v-btn color="pink" dark fixed bottom right fab @click="showCreatePoll">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <CreatePollModal v-model="pollModal"></CreatePollModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PollInfoCard from '@/components/PollInfoCard.vue';
import CreatePollModal from '@/components/CreatePollModal.vue';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'PollList',
  components: {
    PollInfoCard,
    CreatePollModal,
  },
  computed: {
    ...mapGetters('poll', ['polls']),
  },
  data() {
    return {
      pollModal: false,
    };
  },
  methods: {
    ...mapActions('poll', ['fetchPolls']),
  },
  mounted() {
    this.$store.dispatch('poll/fetchPolls');
  },
})
export default class PollList extends Vue {
  public pollModal!: boolean;

  showCreatePoll() {
    this.pollModal = true;
  }
}
</script>
