<!-- GameSelectionView.vue -->
<template>
  <div class="game-selection">
    <h1>Select a Game</h1>
    <v-row>
      <v-col v-for="game in games" :key="game.name" cols="3" md="4">
        <v-card @click="selectGame(game.name)">
          <!-- <v-img src="@/assets/snake_game.jpg" /> -->
          <v-card-title>{{ game.name }}</v-card-title>
          <v-card-subtitle>{{ game.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goBackToHome">Return to Home</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { games } from "@/store/games";

export default {
  data() {
    return {
      games,
    };
  },
  methods: {
    selectGame(route) {
      this.$router.push({ name: route });
    },
    goBackToHome() {
      this.$router.back();
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
