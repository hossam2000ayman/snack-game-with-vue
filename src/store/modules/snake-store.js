export default {
  namespaced: true, // This is necessary for namespacing the module
  state: {
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ],
    food: { x: 10, y: 15 },
    direction: "RIGHT",
    score: 0,
    isGameOver: false,
    isGameActive: true,
  },
  getters: {},
  mutations: {
    SET_GAME_ACTIVE(state, isActive) {
      state.isGameActive = isActive;
    },
    MOVE_SNAKE(state) {
      const snake = [...state.snake];
      const head = { ...snake[0] };

      switch (state.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      snake.unshift(head);
      snake.pop();
      state.snake = snake;
    },
    SET_FOOD_POSITION(state, food) {
      state.food = food;
    },
    UPDATE_DIRECTION(state, newDirection) {
      const oppositeDirections = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (newDirection !== oppositeDirections[state.direction]) {
        state.direction = newDirection;
      }
    },
    UPDATE_SCORE(state) {
      state.score += 1;
    },
    GROW_SNAKE(state) {
      const tail = { ...state.snake[state.snake.length - 1] };
      state.snake.push(tail);
    },
    GAME_OVER(state, isGameOver) {
      state.isGameOver = isGameOver;
    },
    RESET_GAME(state) {
      const midX = Math.floor(20 / 2);
      const midY = Math.floor(20 / 2);

      state.snake = [
        { x: midX, y: midY },
        { x: midX - 1, y: midY },
        { x: midX - 2, y: midY },
        { x: midX - 3, y: midY },
        { x: midX - 4, y: midY },
      ];
      state.direction = "RIGHT";
      state.score = 0;
      state.isGameOver = false;

      // Randomly set food position ensuring it isn't on the snake
      let newFood;
      const snakeSet = new Set(
        state.snake.map((segment) => `${segment.x},${segment.y}`)
      );
      do {
        newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        };
      } while (snakeSet.has(`${newFood.x},${newFood.y}`)); // Ensure food isn't on the snake

      state.food = newFood; // Set the new random food position
    },
  },
  actions: {
    freezeGame({ commit }) {
      commit("SET_GAME_ACTIVE", false);
    },
    unFreezeGame({ commit }) {
      commit("SET_GAME_ACTIVE", true);
    },

    moveSnake({ commit }) {
      commit("MOVE_SNAKE");
    },
    setFoodPosition({ commit, state }) {
      let newFood;
      const snakeSet = new Set(
        state.snake.map((segment) => `${segment.x},${segment.y}`)
      );

      do {
        newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        };
      } while (snakeSet.has(`${newFood.x},${newFood.y}`)); // Ensure food isn't on the snake

      commit("SET_FOOD_POSITION", newFood);
    },
  },
};
