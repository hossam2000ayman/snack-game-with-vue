<template>
  <v-container class="home" fluid>
    <v-row
      justify="center"
      align="center"
      class="text-center"
      style="height: 100vh"
    >
      <v-col cols="12" md="4">
        <h1 class="display-1">Snack Game</h1>
        <v-btn color="primary" @click="startGame" large>Start Game</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
<style scoped>
.home {
  background-color: #f5f5f5;
}
</style>
