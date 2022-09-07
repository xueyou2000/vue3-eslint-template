import { createRouter, createWebHistory } from "vue-router";

export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    { path: "/home", redirect: "/" },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home/index.vue"),
      props: { default: (to: any) => ({ waited: to.meta.waitedFor }) },
    },
    {
      path: "/test",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home/test.vue"),
    },
    {
      path: "/:patchMatch(.*)*",
      name: "NotFound",
      component: import(
        /* webpackChunkName: "home" */ "./views/ErrorPages/NotFound.vue"
      ),
    },
  ],
});
