import { createStore } from "vuex";

export default createStore({
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
  },
  getters: {},
  mutations: {
    // Move the head based on current direction
    MOVE_SNAKE(state) {
      const snake = [...state.snake]; //copy the snake array
      const head = { ...snake[0] }; //snake head
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
      //add the new head position
      snake.unshift(head);
      //remove the last segment (tail) to maintain the same length
      snake.pop();

      state.snake = snake;
    },
    SET_FOOD_POSITION(state, food) {
      state.food = food;
    },
    UPDATE_DIRECTION(state, direction) {
      state.direction = direction;
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
      state.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
      ];
      state.food = { x: 10, y: 15 };
      state.direction = "RIGHT";
      state.score = 0;
      state.isGameOver = false;
    },
  },
  actions: {
    moveSnake({ commit, state }) {
      //logic of snake movement
      let newSnake = [...state.snake];
      //Update Snake based on the current direction
      //Handle collision with food , border or itself
      commit("MOVE_SNAKE", { snake: newSnake });
    },

    setFoodPosition({ commit }) {
      const newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
      commit("SET_FOOD_POSITION", newFood);
    },
  },
  modules: {},
});
