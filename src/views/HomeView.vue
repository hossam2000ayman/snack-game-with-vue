<template>
  <div class="home">
    <h1>Welcome to the Game Collection</h1>
    <v-btn color="primary" @click="goToGames">Play Games</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    goToGames() {
      this.$router.push({ name: "Game Selection" });
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  justify-items: center;
}
</style>
