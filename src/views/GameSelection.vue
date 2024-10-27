<!-- GameSelectionView.vue -->
<template>
  <div class="game-selection">
    <h1>Select a Game</h1>
    <v-row justify="center" class="game-cards">
      <v-col
        v-for="game in games"
        :key="game.name"
        cols="12"
        sm="6"
        md="4"
        class="game-card"
      >
        <v-tooltip :text="game.description" location="bottom">
          <template v-slot:activator="{ props }">
            <v-card
              v-bind="props"
              outlined
              class="hover-card"
              @click="selectGame(game.name)"
            >
              <v-img :src="game.image()" height="200px" class="game-image" />
              <v-card-title class="game-title">{{ game.name }}</v-card-title>
              <v-card-subtitle>{{ game.description }}</v-card-subtitle>
            </v-card>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-btn @click="goBackToHome" color="primary" outlined
        >Return to Home</v-btn
      >
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
  padding: 40px 20px;
}

h1 {
  font-weight: bold;
  margin-bottom: 20px;
}

.game-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.game-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.game-image {
  border-radius: 8px 8px 0 0;
}

.game-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.v-card-subtitle {
  color: #666;
  font-size: 0.9rem;
}
</style>
