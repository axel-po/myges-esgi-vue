import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./presentation/App.vue";
import router from "./router";
import "./presentation/assets/style.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
