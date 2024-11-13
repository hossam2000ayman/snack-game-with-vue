<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="score">Score: {{ score }}</span>
      </v-card-title>
      <div class="game-area" @keydown="handleKeydown" tabindex="0">
        <div
          class="player"
          :style="{ left: playerX + 'px', bottom: playerY + 'px' }"
        ></div>
        <div
          v-for="(platform, index) in platforms"
          :key="index"
          class="platform"
          :style="{ left: platform.x + 'px', bottom: platform.y + 'px' }"
        ></div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("PlatformerModule", [
      "playerX",
      "playerY",
      "score",
      "platforms",
    ]),
  },
  methods: {
    ...mapActions("PlatformerModule", ["initializeGame", "movePlayer"]),
    handleKeydown(event) {
      switch (event.key) {
        case "ArrowLeft":
          this.movePlayer({ direction: "left" });
          break;
        case "ArrowRight":
          this.movePlayer({ direction: "right" });
          break;
        case "ArrowUp":
          this.movePlayer({ direction: "jump" });
          break;
      }
    },
  },
  mounted() {
    this.initializeGame();
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
.game-area {
  position: relative;
  width: 100%;
  height: 400px; /* Height of the game area */
  border: 1px solid #ccc; /* Optional border for visual reference */
  overflow: hidden; /* Prevent overflow of player/platforms */
}

.player {
  position: absolute;
  width: 50px; /* Width of the player */
  height: 50px; /* Height of the player */
  background-color: #007bff; /* Player color */
}

.platform {
  position: absolute;
  width: 100px; /* Width of the platform */
  height: 20px; /* Height of the platform */
  background-color: #28a745; /* Platform color */
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
