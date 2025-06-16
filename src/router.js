// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import UserDetail from './views/UserDetail.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/user/:id', component: UserDetail, props: true }
  ]
});
