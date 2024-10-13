export default {
  state: {
    pacmanPosition: { x: 10, y: 10 },
    direction: "RIGHT",
    dots: [],
    score: 0,
    isGameOver: false,
    ghosts: [],
  },
  mutations: {
    MOVE_PACMAN(state) {
      switch (state.direction) {
        case "UP":
          state.pacManPosition.y -= 1;
          break;
        case "DOWN":
          state.pacManPosition.y += 1;
          break;
        case "LEFT":
          state.pacManPosition.x -= 1;
          break;
        case "RIGHT":
          state.pacManPosition.x += 1;
          break;
      }
    },
    CHANGE_DIRECTION(state, direction) {
      state.direction = direction;
    },
    EAT_DOT(state, dotIndex) {
      state.dots.splice(dotIndex, 1); // Remove eaten dot
      state.score++;
    },
    GAME_OVER(state) {
      state.isGameOver = true;
    },
    RESET_PACMAN(state) {
      state.pacManPosition = { x: 10, y: 10 };
      state.direction = "RIGHT";
      state.dots = []; // Add initial dots
      state.ghosts = []; // Add initial ghosts
      state.score = 0;
      state.isGameOver = false;
    },
  },
  actions: {
    movePacman({ commit }) {
      commit("MOVE_PACMAN");
    },
    changeDirection({ commit }, direction) {
      commit("CHANGE_DIRECTION", direction);
    },
    eatDot({ commit }, dotIndex) {
      commit("EAT_DOT", dotIndex);
    },
    endGame({ commit }) {
      commit("GAME_OVER");
    },
    resetPacman({ commit }) {
      commit("RESET_PACMAN");
    },
  },
};
