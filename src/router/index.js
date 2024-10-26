import { games } from "@/store/games";
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
    path: "/game-selection",
    name: "Game Selection",
    component: () => import("@/views/GameSelection.vue"), //lazy loading
    meta: {
      title: "Game Selection Page",
    },
  },

  ...games.map((game) => ({
    name: game.name,
    path: game.path,
    component: game.component,
    meta: game.meta,
  })),

  // {
  //   path: "/snake",
  //   name: "Snake",
  //   component: () => import("@/views/SnakeGameView.vue"), //lazy loading
  //   meta: {
  //     title: "Snake Page",
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// add logic before each router navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
