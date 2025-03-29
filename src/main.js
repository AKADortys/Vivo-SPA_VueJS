import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VivoBack from './services/VivoBack.js'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.provide('VivoBack', VivoBack)
app.mount('#app')
