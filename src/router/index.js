import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import login from "../views/Login.vue"
import register from "../views/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
        layout: "default",
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        requiresGuest: true,
        layout: 'auth',
      },
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {
        requiresGuest: true,
        layout: 'auth',
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        layout: "default",
      },
    },
  ],
});
router.beforeEach(   (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authStore = useAuthStore();
    if (!authStore.token) {
      authStore.refresh().then(() => next()).catch(() => next('/login'));
    } else {
      next();
    }
  } else if (to.meta.requiresGuest) {
    const authStore = useAuthStore();
    authStore.refresh().then(() => next('/home')).catch(() => next());
  } else {
    next();
  }
});
export default router;
