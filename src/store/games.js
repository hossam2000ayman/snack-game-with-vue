export const games = [
  {
    name: "Snake",
    path: "/snake",
    component: () => import("@/views/SnakeGameView.vue"), //Lazy loading
    description:
      "Navigate the snake to eat food and grow longer without hitting walls!",
    image: () => require("@/assets/images/snake_logo.jpg"),
    meta: {
      title: "Snake Page",
    },
  },
  {
    name: "Tic Tac Toe",
    path: "/ticTacToe",
    component: () => import("@/views/TicTacToeGameView.vue"),
    description: "Challenge yourself with the classic Tic Tac Toe game.",
    image: () => require("@/assets/images/tic-tac-toe.jpg"),
    meta: {
      title: "Tic Tac Toe Page",
    },
  },
];
