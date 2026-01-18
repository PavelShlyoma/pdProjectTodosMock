import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import i18n from './i18n'
import "./assets/main.css";

import "./assets/main.css";
import "vue3-toastify/dist/index.css";
import { axiosInstance } from "./plugins/axios.js";
import App from "./App.vue";
import router from "./router";

async function prepareApp() {
    const { worker } = await import("./mocks/browser");
    return worker.start();
}

const app = createApp(App);

library.add(fas);

app.config.globalProperties.$axios = axiosInstance;
app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(i18n)
prepareApp().then(() => {
    app.mount("#app");
});
