<template>
  <v-container class="tic-tac-toe" fluid>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="6" class="text-center">
        <v-card outlined>
          <v-card-title class="headline">Tic Tac Toe</v-card-title>
          <v-card-subtitle v-if="!winner && isGameActive">
            Current Player : {{ currentPlayer }}
          </v-card-subtitle>
          <v-card-text>
            <div class="board">
              <v-row v-for="(row, rowIndex) in board" :key="rowIndex" dense>
                <v-col
                  v-for="(cell, colIndex) in row"
                  :key="colIndex"
                  cols="4"
                  class="cell text-center"
                  @click="handleCellClick(rowIndex, colIndex)"
                >
                  <v-btn color="primary" depressed block>
                    <span v-if="cell"> {{ cell }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions v-if="winner" class="d-flex justify-center">
            <v-alert type="success" v-if="winner !== 'Draw'">
              Winner : {{ winner }}
            </v-alert>
            <v-alert type="info" v-else> It's a Draw ! </v-alert>
            <v-btn color="primary" @click="resetGame">Play Again</v-btn>
          </v-card-actions>

          <v-card-actions class="w-100 d-flex justify-center">
            <v-btn @click="goBack">Go Back To Collection</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("TicTacToeModule", [
      "board",
      "currentPlayer",
      "winner",
      "isGameActive",
    ]),
  },
  methods: {
    ...mapActions("TicTacToeModule", ["makeMove", "resetGame"]),
    handleCellClick(row, col) {
      if (this.isGameActive) {
        this.makeMove({ row, col });
      }
    },
    resetGame() {
      this.$store.commit("TicTacToeModule/RESET_GAME");
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
.cell {
  padding: 5px;
}
</style>
