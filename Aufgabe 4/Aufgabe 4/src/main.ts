import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");

app.config.globalProperties.$api = "http://127.0.0.1:5000/cat-search/";
app.config.globalProperties.$rest = "http://127.0.0.1:5000/cat-item/";
app.config.globalProperties.$hist = "http://127.0.0.1:5000/history/";

declare module "vue" {
  interface ComponentCustomProperties {
    $api: "http://127.0.0.1:5000/cat-search/";
    $rest: "http://127.0.0.1:5000/cat-item/";
    $hist: "http://127.0.0.1:5000/history/";
  }
}

String.prototype.replaceAt = function(index: number, replacement: string) {
  return this.substring(0, index) + replacement + this.substring(index);
}
