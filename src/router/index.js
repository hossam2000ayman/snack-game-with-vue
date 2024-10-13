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

  {
    path: "/snake",
    name: "Snake",
    component: () => import("@/views/SnakeGameView.vue"), //lazy loading
    meta: {
      title: "Snake Page",
    },
  },

  {
    path: "/mario",
    name: "Mario",
    component: () => import("@/views/MarioGameView.vue"),
    meta: {
      title: "Mario Page",
    },
  },

  {
    path: "/flappy-bird",
    name: "Flappy Bird",
    component: () => import("@/views/FlappyBirdGameView.vue"),
    meta: {
      title: "Flappy Bird Page",
    },
  },

  {
    path: "/pacman",
    name: "Pacman",
    component: () => import("@/views/PacmanGameView.vue"),
    meta: {
      title: "Pacman Page",
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
