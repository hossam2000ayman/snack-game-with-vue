<template>
  <div class="game-board">
    <ScoreBoardComponent :score="score" />
    <div class="board">
      <div
        v-for="(segment, index) in snake"
        :key="index"
        class="snake-segment"
        :style="{ top: segment.y * 20 + 'px', left: segment.x * 20 + 'px' }"
      ></div>
      <div
        class="food"
        :style="{ top: food.y * 20 + 'px', left: food.x * 20 + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ScoreBoardComponent from "@/components/ScoreBoardComponent.vue";

export default {
  computed: {
    ...mapState(["snake", "food", "score", "isGameOver"]),
  },

  components: {
    ScoreBoardComponent,
  },

  mounted() {
    this.gameLoop();
    window.addEventListener("keydown", this.handleKeyPress);
  },

  methods: {
    ...mapActions(["moveSnake", "setFoodPosition"]),
    gameLoop() {
      if (!this.isGameOver) {
        this.moveSnake();
        // Get the snake's head
        const head = this.snake[0];
        const boardWidth = 20; // Assuming the board is 20x20 in grid size
        const boardHeight = 20; // Change according to your board dimensions

        // Check Wall Collision
        if (
          head.x < 0 ||
          head.x >= boardWidth ||
          head.y < 0 ||
          head.y >= boardHeight
        ) {
          this.$store.commit("GAME_OVER", true); //End the Game
          this.$router.replace({ name: "GameOver" });

          return; //Exit the function (loop)
        }

        //Check Self Collision
        for (let i = 1; i < this.snake.length; i++) {
          if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
            this.$store.commit("GAME_OVER", true); // End the Game
            this.$router.replace({ name: "GameOver" });

            return; // Exit the function (loop)
          }
        }

        //Check Food Collision
        if (head.x === this.food.x && head.y === this.food.y) {
          this.$store.commit("UPDATE_SCORE");
          this.$store.commit("GROW_SNAKE");
          this.setFoodPosition();
        }

        //Continue the game loop
        setTimeout(() => {
          this.gameLoop(); //Keep the game loop running
        }, 200); //set the speed of game loop
      }
    },
    handleKeyPress(event) {
      const direction = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      }[event.key];
      if (direction) {
        this.$store.commit("UPDATE_DIRECTION", direction);
      }
    },
  },
};
</script>

<style>
.board {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #e0e0e0;
}

.snake-segment,
.food {
  width: 20px;
  height: 20px;
  position: absolute;
}
.snake-segment {
  transition: all 0.2s ease;
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: green;
}
.food {
  background-color: red;
}
</style>
