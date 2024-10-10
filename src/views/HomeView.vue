<template>
  <div class="home">
    <h1>Snack Game</h1>
    <button v-on:click="startGame">Start Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$router.push({ name: "Game" });
    },
  },
};
</script>
