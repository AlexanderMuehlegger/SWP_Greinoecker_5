import { createApp, VueElement } from "vue";
import App from "./App.vue";


const app = createApp(App)
app.mount("#app");

app.config.globalProperties.$api = "http://127.0.0.1:5000/cat-search/"


declare module 'vue'{
    interface ComponentCustomProperties {
        $api: "http://127.0.0.1:5000/cat-search/",
        $rest: "http://127.0.0.1:5000/cat-item/"
    }
}