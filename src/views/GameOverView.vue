<template>
  <div class="game-over">
    <h1>Game Over</h1>
    <p>Your Score : {{ score }}</p>
    <button @click="restartGame">Play Again</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["score"]),
  },
  methods: {
    restartGame() {
      this.$store.commit("RESET_GAME");
      this.$router.replace({ name: "Game" });
    },
  },
};
</script>
