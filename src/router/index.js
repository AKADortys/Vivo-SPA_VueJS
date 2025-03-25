import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Dashboard from '@/views/Profile.vue'
import Order from '@/views/Order.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard },
  { path: '/order/:id', component: Order },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
