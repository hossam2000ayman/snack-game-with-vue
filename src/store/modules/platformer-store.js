// src/store/modules/PlatformerModule.js
export default {
  namespaced: true,
  state: {
    playerX: 50, // Initial player position
    playerY: 0,
    score: 0,
    platforms: [],
    velocityY: 0, // Vertical velocity
    isJumping: false, // Jump state
  },
  mutations: {
    SET_PLAYER_POSITION(state, { x, y }) {
      state.playerX = x;
      state.playerY = y;
    },
    SET_PLATFORMS(state, platforms) {
      state.platforms = platforms;
    },
    UPDATE_SCORE(state, points) {
      state.score += points;
    },
    SET_VELOCITY(state, velocity) {
      state.velocityY = velocity;
    },
    RESET_VELOCITY(state) {
      state.velocityY = 0;
    },
    SET_IS_JUMPING(state, isJumping) {
      state.isJumping = isJumping; // Set jump state
    },
  },
  actions: {
    initializeGame({ commit }) {
      const platforms = [
        { x: 20, y: 100 },
        { x: 200, y: 200 },
        { x: 400, y: 150 },
        { x: 600, y: 250 }, // New platform
        { x: 800, y: 300 }, // New platform
      ]; // Example platforms
      commit("SET_PLATFORMS", platforms);
      commit("SET_PLAYER_POSITION", { x: 50, y: 0 }); // Reset player position
      commit("RESET_VELOCITY");
      commit("SET_IS_JUMPING", false); // Reset jump state
    },
    movePlayer({ state, commit }, { direction }) {
      const step = 10; // Movement step
      let newX = state.playerX;
      let newY = state.playerY;

      // Handle horizontal movement
      switch (direction) {
        case "left":
          newX = Math.max(0, state.playerX - step);
          break;
        case "right":
          newX = Math.min(window.innerWidth - 50, state.playerX + step);
          break;
        case "jump":
          if (!state.isJumping) {
            commit("SET_VELOCITY", -15); // Set jump velocity
            commit("SET_IS_JUMPING", true); // Set jump state
          }
          break;
      }
      // Update player's vertical position with gravity
      if (state.isJumping) {
        newY += state.velocityY; // Apply vertical velocity
        commit("SET_VELOCITY", state.velocityY + 1); // Simulate gravity
        if (newY >= 0) {
          newY = 0; // Reset to ground level
          commit("RESET_VELOCITY");
          commit("SET_IS_JUMPING", false); // Reset jump state
        }
      }

      commit("SET_PLAYER_POSITION", { x: newX, y: newY });
    },
  },
};
