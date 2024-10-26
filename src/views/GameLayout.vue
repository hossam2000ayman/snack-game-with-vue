<template>
  <v-container>
    <ScoreBoardComponent :score="score" />
    <v-row class="game-area">
      <!-- each game component will populated here  -->
      <slot></slot>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.game-area {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px; /*adjust as needed*/
}
</style>
