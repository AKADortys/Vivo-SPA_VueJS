import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import Home from '@/views/Home-view.vue'
import About from '@/views/About-view.vue'
import Dashboard from '@/views/Profile-view.vue'
import Order from '@/views/Order-view.vue'
import Product from '@/views/Product-view.vue'
import Admin from '@/views/Admin-view.vue'
import ErrorView from '@/views/404-view.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard },
  { path: '/order/:id', component: Order },
  { path: '/produits', component: Product },
  { path: '/admin', component: Admin, meta: { admin: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  try {
    await user.chargerUtilisateur()

    if (to.meta.admin && (!user.utilisateur || user.utilisateur.role !== 'admin')) {
      console.warn('Accès refusé à l’écran d’administration')
      return next({ path: '/' })
    }

    next()
  } catch (error) {
    console.error('Erreur lors du chargement de l’utilisateur:', error)
    next({ path: '/' })
  }
})

export default router
