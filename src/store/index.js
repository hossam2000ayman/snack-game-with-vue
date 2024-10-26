import { createStore } from "vuex";
import SnakeModule from "@/store/modules/snake-store.js";
import TicTacToeModule from "@/store/modules/tic-tac-toe-store.js";
export default createStore({
  modules: { SnakeModule, TicTacToeModule },
});
