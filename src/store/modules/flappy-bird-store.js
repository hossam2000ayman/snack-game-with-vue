export default {
  namespaced: true, // This is necessary for namespacing the module
  state: {
    birdPosition: { x: 100, y: 200 },
    pipes: [],
    score: 0,
    isGameOver: false,
    pipeGap: 150, // minimum gap between pipes
    pipeSpeed: 5,
    pipeInterval: 1000,
    lastPipeTime: 0, //Track when last pipe was added
    velocity: 0,
    gravity: 0.6,
    flyStrength: -10, //Negative value for upward force
    pipeWidth: 50,
  },

  mutations: {
    MOVE_BIRD(state) {
      state.velocity += state.gravity; //Bird falls faster as velocity increases
      state.birdPosition.y += state.velocity; // Update bird's position by adding velocity
    },
    FLAP_BIRD(state) {
      state.velocity = state.flyStrength; // Give an upward velocity
    },
    GENERATE_PIPE(state) {
      const currentTime = Date.now();
      if (currentTime - state.lastPipeTime > state.pipeInterval) {
        const pipeHeight = Math.floor(Math.random() * 200) + 100;
        const bottomPipeHeight = 400 - pipeHeight - state.pipeGap;
        const newPipe = {
          x: window.innerWidth,
          topPipeHeight: pipeHeight,
          bottomPipeHeight: bottomPipeHeight,
          scored: false,
        };
        console.log("New Pipe Generated :: ", newPipe);
        // Add new pipes to the array
        state.pipes.push(newPipe);
        // Update the time the last pipe was added
        state.lastPipeTime = currentTime;
      }
    },
    MOVE_PIPE(state) {
      // Only keep pipes that are still visible
      state.pipes = state.pipes
        .map((pipe) => ({
          ...pipe,
          x: pipe.x - state.pipeSpeed,
        }))
        .filter((pipe) => pipe.x + state.pipeWidth > 0);
    },
    CHECK_COLLISION(state) {
      state.pipes.forEach((pipe) => {
        // Check if bird collides with left or right of pipe
        if (
          state.birdPosition.x > pipe.x &&
          state.birdPosition.x < pipe.x + state.pipeWidth
        ) {
          // Add padding to top and bottom for better collision detection
          const collisionPadding = 5;
          if (
            state.birdPosition.y < pipe.topPipeHeight - collisionPadding ||
            state.birdPosition.y >
              600 - pipe.bottomPipeHeight + collisionPadding
          ) {
            state.isGameOver = true;
          }
        }
      });

      // Check if bird hits the ground or flies too high
      if (state.birdPosition.y > 600 || state.birdPosition.y < 0) {
        state.isGameOver = true;
      }
    },
    INCREMENT_SCORE(state) {
      state.score++;
    },
    GAME_OVER(state) {
      state.isGameOver = true;
    },
    RESET_GAME(state) {
      state.birdPosition = { x: 100, y: 200 };
      state.velocity = 0;
      state.pipes = [];
      state.score = 0;
      state.isGameOver = false;
    },
  },
  actions: {
    moveBird({ commit }) {
      commit("MOVE_BIRD");
    },
    flapBird({ commit }) {
      commit("FLAP_BIRD");
    },
    generatePipe({ commit }) {
      commit("GENERATE_PIPE");
    },
    movePipes({ commit }) {
      commit("MOVE_PIPE");
    },
    checkCollision({ commit }) {
      commit("CHECK_COLLISION");
    },
    incrementScore({ commit }) {
      commit("INCREMENT_SCORE");
    },
    gameOver({ commit }) {
      commit("GAME_OVER");
    },
    resetGame({ commit }) {
      commit("RESET_GAME");
    },
  },
};
