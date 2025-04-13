import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

// Création d'un cache avec une durée de vie de 1 minutes
const cache = setupCache({
  maxAge: 1 * 60 * 1000,
  exclude: { query: false }, // Permet de cacher aussi les requêtes avec des params
})

class VivoBack {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      adapter: cache.adapter,
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
  getUsers(page, limit, search) {
    return this.request('get', `/users?page=${page ?? 1}&limit=${limit ?? 10}&search=${search}`)
  } //
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
    return this.request('get', `/users/${userId}`)
  }

  updateUser(userId, userData) {
    return this.request('put', `/users/${userId}`, userData)
  } //

  // Gestion des commandes
  getOrders(page, limit) {
    return this.request('get', `orders?page=${page ?? 1}&limit=${limit ?? 10}`)
  }

  getOrdersByStatus(status, page, limit) {
    return this.request('get', `orders/status/${status}?page=${page ?? 1}&limit=${limit ?? 10}`)
  }

  getUserOrders(userId, page, limit) {
    return this.request('get', `/orders/user/${userId}?page=${page ?? 1}&limit=${limit ?? 10}`)
  } //

  getOrderById(orderId) {
    return this.request('get', `/orders/${orderId}`)
  } //

  createOrder(orderData) {
    return this.request('post', '/orders', orderData)
  } //

  updateOrder(orderId, updateData) {
    return this.request('put', `/orders/${orderId}`, updateData)
  }

  deleteOrder(orderId) {
    return this.request('delete', `/orders/${orderId}`)
  }

  getOrderFull(orderId) {
    return this.request('get', `/orders/detail/${orderId}`)
  }

  // Gestion des produits
  async getProducts() {
    const data = await this.request('get', '/products')
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

export default new VivoBack(import.meta.env.VITE_BACK_URI || 'https://tfm-sgbd-ancelt.onrender.com') //"https://tfm-sgbd-ancelt.onrender.com" || "http://localhost:3300
