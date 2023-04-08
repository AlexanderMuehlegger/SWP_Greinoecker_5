import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

let pinia = createPinia()

createApp(App).use(pinia).mount('#app')


