import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

// Création d'un cache avec une durée de vie de 3 minutes
const cache = setupCache({
  maxAge: 3 * 60 * 1000,
  exclude: { query: false }, // Permet de cacher aussi les requêtes avec des params
})

class VivoBack {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      withCredentials: true, // Important pour envoyer le cookie d'authentification
      headers: { 'Content-Type': 'application/json' },
      adapter: cache.adapter, // Utilisation du cache
    })
  }

  // Méthode pour gérer les erreurs globales
  async request(method, url, data = null) {
    try {
      const options = { method, url }
      if (data !== null) {
        options.data = data
      }
      const response = await this.api(options)

      // if (response.request.fromCache) {
      //   console.log('✅ Données chargées depuis le cache')
      // } else {
      //   console.log("🔄 Données récupérées depuis l'API")
      // }

      return response.data
    } catch (error) {
      const message = error.response?.data || error.message
      console.error(`Erreur sur ${method.toUpperCase()} ${url}:`, message)
      throw message
    }
  }

  // Authentification
  login(authData) {
    return this.request('post', '/auth/login', authData)
  } //

  logout() {
    return this.request('post', '/auth/logout')
  } //

  register(userData) {
    return this.request('post', '/users', userData)
  } //
  getUser(userId) {
    const user = this.request('get', `/users/${userId}`)
  }

  // Gestion des commandes
  getOrders() {
    return this.request('get', '/orders')
  }

  getUserOrders(userId) {
    return this.request('get', `/orders/user/${userId}`)
  }

  getOrderById(orderId) {
    return this.request('get', `/orders/${orderId}`)
  }

  createOrder(orderData) {
    return this.request('post', '/orders', orderData)
  }

  updateOrder(orderId, updateData) {
    return this.request('put', `/orders/${orderId}`, updateData)
  }

  deleteOrder(orderId) {
    return this.request('delete', `/orders/${orderId}`)
  }

  // Gestion des produits
  async getProducts() {
    const data = await this.request('get', '/products')
    sessionStorage.setItem('products', JSON.stringify(data))
    return data
  } //
  getProductById(productId) {
    return this.request('get', `/products/${productId}`)
  }
  createProduct(productData) {
    return this.request('post', '/products', productData)
  }
  updateProduct(productId, updateData) {
    return this.request('put', `/products/${productId}`, updateData)
  }
  deleteProduct(productId) {
    return this.request('delete', `/products/${productId}`)
  }
}

export default new VivoBack('http://localhost:3300')
