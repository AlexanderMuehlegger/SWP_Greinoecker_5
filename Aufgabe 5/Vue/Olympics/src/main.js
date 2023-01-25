import { createApp } from 'vue'
import App from './App.vue'

var app = createApp(App)

app.config.globalProperties.$hostname = 'http://127.0.0.1:5000/'

app.mount('#app')

