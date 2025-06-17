import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import UserDetail from "./views/UserDetail.vue";
import EditUserView from "./views/EditUserView.vue";
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/user/:id", component: UserDetail, props: true },
    { path: "/edit/:id", component: EditUserView, props: true },
  ],
});
