<template>
  <GameLayout :score="score">
    <v-container class="game-view" fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-text>
              <div class="board">
                <div
                  v-for="(segment, index) in snake"
                  :key="index"
                  class="snake-segment"
                  :style="{
                    top: segment.y * 20 + 'px',
                    left: segment.x * 20 + 'px',
                  }"
                ></div>
                <div
                  class="food"
                  :style="{ top: food.y * 20 + 'px', left: food.x * 20 + 'px' }"
                ></div>
              </div>
            </v-card-text>
            <v-card-actions class="w-100 d-flex justify-center">
              <v-btn @click="goBack">Go Back to Collection</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Game Over Dialog -->
      <v-dialog v-model="isGameOver" persistent max-width="400px">
        <v-card>
          <v-card-title class="headline text-center">Game Over</v-card-title>
          <v-card-text class="text-center">
            <p>Your Score: {{ score }}</p>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="restartGame">Play Again</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </GameLayout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GameLayout from "./GameLayout.vue";

export default {
  data() {
    return {
      keyPressTimeout: null,
    };
  },
  computed: {
    ...mapState("SnakeModule", [
      "snake",
      "food",
      "score",
      "isGameOver",
      "isGameActive",
    ]),
  },
  components: {
    GameLayout,
  },
  mounted() {
    this.initializeGame();
    window.addEventListener("keydown", this.handleKeyPress);
  },
  methods: {
    ...mapActions("SnakeModule", ["moveSnake", "setFoodPosition"]),

    initializeGame() {
      this.$store.dispatch("SnakeModule/unFreezeGame"); // Set the game to active
      this.startGameLoop();
    },

    startGameLoop() {
      // Only start the game loop if the game is active and not over
      if (this.isGameActive && !this.isGameOver) {
        this.moveSnake();

        const head = this.snake[0];
        const boardWidth = 20;
        const boardHeight = 20;

        // Check Wall Collision
        if (
          head.x < 0 ||
          head.x >= boardWidth ||
          head.y < 0 ||
          head.y >= boardHeight
        ) {
          this.$store.commit("SnakeModule/GAME_OVER", true);
          return;
        }

        // Check Self Collision
        for (let i = 1; i < this.snake.length; i++) {
          if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
            this.$store.commit("SnakeModule/GAME_OVER", true);
            return;
          }
        }

        // Check Food Collision
        if (head.x === this.food.x && head.y === this.food.y) {
          this.$store.commit("SnakeModule/UPDATE_SCORE");
          this.$store.commit("SnakeModule/GROW_SNAKE");
          this.setFoodPosition();
        }

        setTimeout(() => {
          this.startGameLoop();
        }, 200);
      }
    },

    restartGame() {
      this.$store.commit("SnakeModule/RESET_GAME");
      this.isGameOver = false;
      this.initializeGame(); // Restart the game properly
    },

    handleKeyPress(event) {
      const directionMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };

      const newDirection = directionMap[event.key];

      if (newDirection && !this.keyPressTimeout) {
        this.$store.commit("SnakeModule/UPDATE_DIRECTION", newDirection);

        // Set a timeout to control the debounce interval
        this.keyPressTimeout = setTimeout(() => {
          this.keyPressTimeout = null;
        }, 100);
      }
    },

    goBack() {
      this.$router.back();
    },
  },

  beforeUnmount() {
    // Freeze the game state when leaving
    this.$store.dispatch("SnakeModule/freezeGame");

    // Clear timeout on component unmount to avoid memory leaks
    if (this.keyPressTimeout) {
      clearTimeout(this.keyPressTimeout);
    }
    window.removeEventListener("keydown", this.handleKeyPress); // Clean up event listener
  },
};
</script>

<style scoped>
.board {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #e0e0e0;
  border: 2px solid #000;
  margin: 0 auto;
}

.snake-segment,
.food {
  width: 20px;
  height: 20px;
  position: absolute;
}

.snake-segment {
  transition: all 0.2s ease;
  background-color: green;
}

.food {
  background-color: red;
}
</style>
