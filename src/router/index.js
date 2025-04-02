import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Dashboard from '@/views/Profile.vue'
import Order from '@/views/Order.vue'
import Product from '@/views/Product.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard },
  { path: '/order/:id', component: Order },
  { path: '/produits', component: Product },
]

const router = createRouter({
  history: createWebHashHistory(), //history: createWebHistory(),
  routes,
})

export default router
