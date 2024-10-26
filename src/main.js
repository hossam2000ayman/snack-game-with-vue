import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { games } from "./store/games";
import ScoreBoardComponent from "./components/ScoreBoardComponent.vue";

loadFonts();

const app = createApp(App);

app.component("ScoreBoardComponent", ScoreBoardComponent);
games.forEach((game) => {
  router.beforeEach((to, from, next) => {
    if (to.name === game.name && !store.hasModule(game.name)) {
      game.module().then((module) => {
        store.registerModule(game.name, module.default);
      });
    }
    next();
  });
});
app.use(router).use(store).use(vuetify).mount("#app");
