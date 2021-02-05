import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page - SVote',
    },
  },
  {
    path: '/polls',
    name: 'Polls',
    component: () => import(/* webpackChunkName: "polls" */ '../views/PollList.vue'),
    meta: { requiresAuth: true, title: 'Poll List - SVote' },
  },
  {
    path: '/polls/:pollId',
    name: 'PollDetail',
    component: () => import(/* webpackChunkName: "poll" */ '../views/PollDetail.vue'),
    meta: { requiresAuth: true, title: 'Poll Detail - SVote' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Update page title.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  const { auth } = store.state as any;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.accessToken === '') {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
