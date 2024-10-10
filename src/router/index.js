import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"), //lazy loading
    meta: {
      title: "Home Page",
    },
  },

  {
    path: "/game",
    name: "Game",
    component: () => import("@/views/GameView.vue"), //lazy loading
    meta: {
      title: "Game Page",
    },
  },

  {
    path: "/game-over",
    name: "GameOver",
    component: () => import("@/views/GameOverView.vue"), //lazy loading
    meta: {
      title: "Game Over Page",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// add logic before each router navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
