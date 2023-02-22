import { createApp } from 'vue'
import App from './App.vue'

var app = createApp(App)

app.config.globalProperties.$hostname = 'http://127.0.0.1:5000/'

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

app.config.globalProperties.$sortByKey = sortByKey;

app.mount('#app')

