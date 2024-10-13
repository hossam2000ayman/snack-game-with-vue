<template>
  <v-container class="flappy-bird-game" fluid>
    <!-- Score Display -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="game-board" elevation="4">
          <!-- Bird -->
          <div
            class="bird"
            :style="{ top: birdPosition.y + 'px', left: birdPosition.x + 'px' }"
          ></div>

          <!-- Pipes -->
          <div
            v-for="(pipe, index) in pipes"
            :key="index"
            class="pipe"
            :style="{ left: pipe.x + 'px' }"
          >
            <!-- Top Pipe -->
            <div
              class="top-pipe"
              :style="{ height: pipe.topPipeHeight + 'px' }"
            >
              <p>Top Pipe Height: {{ pipe.topPipeHeight }}</p>
            </div>
          </div>

          <!-- Game Over Message -->
          <div v-if="isGameOver" class="game-over-message">
            <v-row justify="center">
              <h1>Game Over!</h1>
            </v-row>
            <v-row justify="center">
              <h3>Score : {{ score }}</h3>
            </v-row>
            <v-row justify="center">
              <v-btn @click="resetGame">Restart</v-btn>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "FlappyBirdView",
  computed: {
    ...mapState("FlappyBirdModule", [
      "birdPosition",
      "pipes",
      "isGameOver",
      "pipeWidth",
      "score",
    ]),
  },
  methods: {
    ...mapActions("FlappyBirdModule", [
      "moveBird",
      "flapBird",
      "generatePipe",
      "movePipes",
      "checkCollision",
      "incrementScore",
      "resetGame",
    ]),
    handleKeyPress(event) {
      if (event.key === " ") {
        this.flapBird();
      }
    },

    checkPipeCrossing() {
      this.pipes.forEach((pipe) => {
        if (!pipe.scored && this.birdPosition.x > pipe.x + this.pipeWidth) {
          this.incrementScore();
          pipe.score = true;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("keypress", this.handleKeyPress);
    // Define the game loop using setInterval
    this.gameLoop = setInterval(() => {
      if (!this.isGameOver) {
        this.moveBird(); // Move the bird based on velocity/gravity
        this.movePipes(); // Move pipes across the screen
        this.checkCollision(); // Check if the bird has collided with pipes
        this.checkPipeCrossing(); // Check if the bird has crossed a pipe
        this.generatePipe(); // Generate new pipes periodically
      }
    }, 1000 / 60); // Run the game loop at 60 frames per second
  },
  beforeUnmount() {
    clearInterval(this.gameLoop); // Stop the game loop
    window.removeEventListener("keypress", this.handleKeyPress); // Clean up the event listener
  },
};
</script>

<style scoped>
.flappy-bird-game {
  text-align: center;
}

.game-board {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: lightblue;
  overflow: hidden;
}

.bird {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: yellow;
  border-radius: 50%;
}

.pipe {
  position: absolute;
  width: 50px;
  background-color: green;
}

.top-pipe {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: white;
}

.bottom-pipe {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: yellow;
}

.game-over-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
