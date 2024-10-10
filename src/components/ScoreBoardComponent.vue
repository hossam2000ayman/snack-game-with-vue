<template>
  <div class="score-board">
    <h3>Score : {{ score }}</h3>
  </div>
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
.score-board {
  margin-bottom: 20px;
  text-align: center;
  font-style: 20px;
  font-weight: bold;
}
</style>
