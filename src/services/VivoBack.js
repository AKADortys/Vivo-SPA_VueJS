import axios from 'axios'

class VivoBack {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      withCredentials: true, // Important pour envoyer le cookie d'authentification
      headers: { 'Content-Type': 'application/json' },
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
  }

  logout() {
    return this.request('post', '/auth/logout')
  }

  getUser(userId) {
    return this.request('get', `/users/${userId}`)
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
  getProducts() {
    return this.request('get', '/products')
  }
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

export default new VivoBack('https://tfm-sgbd-ancelt.onrender.com')
