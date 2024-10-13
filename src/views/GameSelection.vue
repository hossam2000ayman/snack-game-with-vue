<!-- GameSelectionView.vue -->
<template>
  <div class="game-selection">
    <h1>Select a Game</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card @click="selectGame('Snake')">
          <!-- <v-img src="@/assets/snake_game.jpg" /> -->
          <v-card-title>Snake Game</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card @click="selectGame('Mario')">
          <!-- <v-img src="@/assets/mario_game.jpg" /> -->
          <v-card-title>Mario Game</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card @click="selectGame('Flappy Bird')">
          <!-- <v-img src="@/assets/flappy_game.jpg" /> -->
          <v-card-title>Flappy Bird</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card @click="selectGame('Pacman')">
          <!-- <v-img src="@/assets/pacman_game.jpg" /> -->
          <v-card-title>Pacman</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    selectGame(game) {
      this.$router.push({ name: game });
    },
  },
};
</script>

<style scoped>
.game-selection {
  text-align: center;
  padding: 20px;
}
</style>
