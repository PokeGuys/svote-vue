<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn v-if="showBack" icon class="hidden-xs-only mr-4" @click="backToPollList">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>SVote</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" icon class="hidden-xs-only mr-4" @click="signOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  data() {
    return {
      showBack: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.accessToken !== '';
    },
  },
  watch: {
    $route(to: any) {
      (this as any).showBack = to.name === 'PollDetail';
    },
  },
  mounted() {
    this.$store.dispatch('auth/init');
  },
})
export default class App extends Vue {
  public showBack!: boolean;

  constructor() {
    super();
    this.showBack = false;
  }

  backToPollList() {
    this.$router.push({ path: '/polls' });
  }

  signOut() {
    this.$store.dispatch('auth/signOut').then(() => {
      this.$router.push('/');
    });
  }
}
</script>
