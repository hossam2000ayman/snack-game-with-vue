<template>
  <v-card class="pa-3" outlined>
    <v-card-title class="text-center">
      <h3>Score: {{ score }}</h3>
    </v-card-title>
  </v-card>
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
h3 {
  font-weight: bold;
  color: #1976d2;
}
</style>
