import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);
const BASE = process.env.NODE_ENV === "production" ? process.env.VUE_APP_PUBLIC_PATH : "/";
const routes: Array<RouteConfig> = [
  {
    path: BASE,
    name: "Home",
    component: Home,
  },
  {
    path: BASE + "about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
