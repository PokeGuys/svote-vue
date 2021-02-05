<template>
  <v-row justify="center">
    <v-dialog v-model="show" :persistent="loading" max-width="600px">
      <v-card>
        <v-progress-linear :indeterminate="true" :active="loading"></v-progress-linear>
        <v-card-title>
          <span class="headline">Create poll</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  type="text"
                  label="Poll title"
                  prepend-icon="mdi-subtitles"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <DatePicker
                  v-model="startAt"
                  :min="nowDate"
                  :max="endAt"
                  label="Start time"
                ></DatePicker>
              </v-col>
              <v-col cols="12">
                <DatePicker v-model="endAt" :min="startAt || nowDate" label="End time"></DatePicker>
              </v-col>
              <v-col cols="12" v-for="(option, idx) in options" :key="idx">
                <v-text-field
                  v-model="options[idx]"
                  type="text"
                  label="Poll Options"
                  prepend-icon="mdi-format-align-left"
                  :append-icon="idx > 1 ? 'mdi-close' : ''"
                  @click:append="removeOptions(idx)"
                ></v-text-field>
              </v-col>
              <v-btn color="primary" :disabled="options.length > 20" @click="addOptions">
                Add more option
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text :disabled="loading" @click="create">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import DatePicker from '@/components/DatePicker.vue';

@Component({
  name: 'CreatePollModal',
  methods: {
    ...mapActions('poll', ['createPoll']),
  },
  components: {
    DatePicker,
  },
})
export default class CreatePollModal extends Vue {
  public title: string;

  public startAt!: string;

  public endAt!: string;

  public nowDate: string;

  public options!: string[];

  public loading: boolean;

  public showError: boolean;

  @Prop() private value!: boolean;

  private createPoll!: ({ title, startAt, endAt, options }: any) => any;

  constructor() {
    super();
    this.title = '';
    this.startAt = '';
    this.endAt = '';
    this.nowDate = new Date().toISOString().slice(0, 10);
    this.options = ['', '', ''];
    this.loading = false;
    this.showError = false;
  }

  get show() {
    return this.value;
  }

  set show(value: boolean) {
    if (!value) {
      this.$emit('close');
      this.title = '';
      this.loading = false;
    }
    this.$emit('input', value);
  }

  create() {
    this.showError = false;
    this.loading = true;
    const startAt = this.$dayjs.utc(this.startAt).unix();
    const endAt = this.$dayjs.utc(this.endAt).unix();
    this.createPoll({ startAt, endAt, title: this.title, options: this.options })
      .then((poll: any) => {
        this.loading = false;
        this.show = false;
        if (poll.isActive) {
          this.$router.push({ path: `/polls/${poll.id}` });
        }
        console.log(poll);
      })
      .catch((err: any) => {
        console.error(err);
        this.showError = true;
        this.loading = false;
      });
  }

  addOptions() {
    this.options.push('');
  }

  removeOptions(idx: number) {
    this.options.splice(idx, 1);
  }
}
</script>
