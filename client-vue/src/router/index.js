import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
  },
  {
    path: "/games/add",
    name: "games.add",
    component: () => import("../views/Games/Add.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((item) => item.meta.requiresAuth);

  if (authRequired && store.state.token === null) {
    next("/");
  } else {
    next();
  }
});

export default router;
