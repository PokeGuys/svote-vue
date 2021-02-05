<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col class="my-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Welcome to SVote
          </h1>

          <p class="subheading font-weight-regular">
            A simple, real-time, and secure system for people to express their opinions.
          </p>
        </v-col>

        <v-col class="mb-5" cols="12">
          <v-btn color="primary" elevation="2" rounded x-large @click="tryAuthenticate"
            >Get Started</v-btn
          >
        </v-col>
      </v-row>
      <AuthModal v-model="authModal"></AuthModal>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import AuthModal from '@/components/AuthModal.vue';

@Component({
  components: {
    AuthModal,
  },
  data() {
    return {
      authModal: false,
    };
  },
  computed: {
    ...mapState('auth', ['accessToken']),
  },
  watch: {
    accessToken(newState: string) {
      if (newState !== '') {
        this.$router.push({ path: '/polls' });
      }
    },
  },
})
export default class Home extends Vue {
  public authModal!: boolean;

  private readonly accessToken!: string;

  tryAuthenticate() {
    if (this.accessToken !== '') {
      this.$router.push({ path: '/polls' });
      return;
    }
    this.authModal = true;
  }
}
</script>
