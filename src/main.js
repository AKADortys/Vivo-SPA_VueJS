import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VivoBack from './services/VivoBack.js'
import { useUserStore } from './store/userStore'
import { usePanierStore } from './store/cartStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.provide('VivoBack', VivoBack)
app.mount('#app')
const userStore = useUserStore()
userStore.chargerUtilisateur()
const cartStore = usePanierStore()
cartStore.chargerPanier()
