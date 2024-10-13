import { createStore } from "vuex";
import SnakeModule from "@/store/modules/snake-store.js";
import MarioModule from "@/store/modules/mario-store.js";
import PacmanModule from "@/store/modules/pacman-store.js";
import FlappyBirdModule from "@/store/modules/flappy-bird-store.js";
export default createStore({
  modules: { SnakeModule, MarioModule, PacmanModule, FlappyBirdModule },
});
