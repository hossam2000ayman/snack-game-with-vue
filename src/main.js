import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ScoreBoardComponent from "./components/ScoreBoardComponent.vue";

loadFonts();

const app = createApp(App);

app.component("ScoreBoardComponent", ScoreBoardComponent);
app.use(router).use(store).use(vuetify).mount("#app");
