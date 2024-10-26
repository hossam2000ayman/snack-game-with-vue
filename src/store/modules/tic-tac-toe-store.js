export default {
  namespaced: true,
  state: {
    board: Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)), // 3x3 grid
    currentPlayer: "X",
    winner: null,
    isGameActive: true,
  },
  getters: {
    isBoardFull(state) {
      return state.board.flat().every((cell) => cell !== null);
    },
    getCurrentPlayer(state) {
      return state.currentPlayer;
    },
  },
  mutations: {
    MAKE_MOVE(state, { row, col }) {
      if (state.board[row][col] === null && state.isGameActive) {
        state.board[row][col] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === "X" ? "O" : "X"; // Switch Player
      }
    },
    SET_WINNER(state, winner) {
      state.winner = winner;
      state.isGameActive = false; // Stop the game
    },
    RESET_GAME(state) {
      state.board = Array(3)
        .fill(null)
        .map(() => Array(3).fill(null));
      state.currentPlayer = "X";
      state.winner = null;
      state.isGameActive = true;
    },
  },
  actions: {
    makeMove({ commit, dispatch }, { row, col }) {
      // Corrected parameter names to 'row' and 'col'
      commit("MAKE_MOVE", { row, col });
      dispatch("checkWinner");
    },
    checkWinner({ state, commit, getters }) {
      const { board } = state;

      // Check rows, columns, and diagonals for a winner
      for (let i = 0; i < 3; i++) {
        // Check rows
        if (
          board[i][0] &&
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2]
        ) {
          commit("SET_WINNER", board[i][0]);
          return;
        }

        // Check columns
        if (
          board[0][i] &&
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i]
        ) {
          commit("SET_WINNER", board[0][i]);
          return;
        }
      }

      // Check diagonals
      if (
        board[0][0] &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
      ) {
        commit("SET_WINNER", board[0][0]);
        return;
      }
      if (
        board[0][2] &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
      ) {
        commit("SET_WINNER", board[0][2]);
        return;
      }

      // Check for draw
      if (getters.isBoardFull) {
        commit("SET_WINNER", "Draw");
      }
    },
  },
};
