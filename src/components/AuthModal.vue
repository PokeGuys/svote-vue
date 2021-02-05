<template>
  <v-row justify="center">
    <v-dialog v-model="show" :persistent="loading" max-width="600px">
      <v-card>
        <v-progress-linear :indeterminate="true" :active="loading"></v-progress-linear>
        <v-card-title>
          <span class="headline">Authentication</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-alert :value="showError" dark color="error">Authentication failed</v-alert>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="hkid"
                  :append-icon="displayHKID ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="displayHKID ? 'text' : 'password'"
                  label="HK ID number"
                  counter
                  @click:append="displayHKID = !displayHKID"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text :disabled="loading" @click="authenticate">
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
import router from '@/router';

@Component({
  name: 'AuthModal',
  methods: {
    ...mapActions('auth', ['login']),
  },
})
export default class AuthModal extends Vue {
  public hkid: string;

  public displayHKID: boolean;

  public loading: boolean;

  public showError: boolean;

  @Prop() private value!: boolean;

  private login!: (hkid: string) => any;

  constructor() {
    super();
    this.hkid = '';
    this.displayHKID = false;
    this.loading = false;
    this.showError = false;
  }

  get show() {
    return this.value;
  }

  set show(value: boolean) {
    if (!value) {
      this.$emit('close');
      this.hkid = '';
      this.loading = false;
    }
    this.$emit('input', value);
  }

  authenticate() {
    this.showError = false;
    this.loading = true;
    this.login(this.hkid)
      .then(() => {
        this.loading = false;
        this.show = false;
        router.push({ path: '/polls' });
      })
      .catch((err: any) => {
        console.error(err);
        this.showError = true;
        this.loading = false;
      });
  }
}
</script>
