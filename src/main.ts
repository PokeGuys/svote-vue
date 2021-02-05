import Vue from 'vue';
import App from './App.vue';
import setupAxios from './plugins/api';
import dayJS from './plugins/dayjs';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

setupAxios(store);

Vue.use(dayJS);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
