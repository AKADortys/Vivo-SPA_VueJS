import { defineStore } from 'pinia'
import Dexie from 'dexie'
import VivoBack from '@/services/VivoBack'

// Création de la base de données
const db = new Dexie('VivoCart')
db.version(2).stores({
  panier: 'id, label, price, quantity',
  product: 'id, label, description, price, category, available,expiresAt',
})

export const usePanierStore = defineStore('panier', {
  state: () => ({
    products: [],
    orderProduct: [],
    total: 0,
  }),

  actions: {
    // Charger les orderProduct depuis Dexie au démarrage
    async chargerPanier() {
      this.orderProduct = await db.panier.toArray()
      this.calculerTotal()
    },
    async getProduct() {
      const TTL = 5 * 60 * 1000
      const now = Date.now()
      try {
        const response = await VivoBack.getProducts()
        this.products = response.map((p) => ({ ...p, id: p._id }))

        for (const elm of this.products) {
          delete elm._id
          const exists = await db.product.get(elm.id)
          const withTTL = {
            ...elm,
            expiresAt: now + TTL,
          }
          if (!exists) {
            await db.product.add(withTTL)
          } else {
            await db.product.update(elm.id, withTTL)
          }
        }
      } catch (error) {
        console.error('getProducts a échoué\n', error)
        // Supprimer les produits expirés
        this.clearProducts()
        // Charger les produits valides
        this.products = await db.product
          .filter((prod) => !prod.expiresAt || prod.expiresAt > Date.now())
          .toArray()
      }
    },
    async clearProducts() {
      const now = Date.now()
      await db.product.where('expiresAt').belowOrEqual(now).delete()
    },
    async ajouterProduit(produit) {
      const existant = await db.panier.get(produit.id)

      if (existant) {
        existant.quantity += 1 // Incrémente la quantité
        await db.panier.put(existant) // Met à jour IndexedDB

        // Met à jour le tableau `orderProduct` en trouvant l'index du produit
        this.orderProduct = this.orderProduct.map((p) => (p.id === existant.id ? existant : p))
        this.calculerTotal()
      } else {
        produit.quantity = 1 // Initialise la quantité
        await db.panier.add(produit) // Ajoute dans IndexedDB

        // Ajoute au state local
        this.orderProduct.push(produit)
        this.calculerTotal()
      }
    },
    // Supprimer un produit du panier
    async supprimerProduit(id) {
      this.orderProduct = this.orderProduct.filter((p) => p.id !== id)
      await db.panier.delete(id) // Supprime de IndexedDB
      this.calculerTotal()
    },
    // Vider complètement le panier
    async viderPanier() {
      this.orderProduct = []
      await db.panier.clear()
      this.total = 0 // Met à jour le total en vide
    },
    // Calculer le total du panier
    async calculerTotal() {
      this.total = this.orderProduct.reduce(
        (total, produit) => total + produit.price * produit.quantity,
        0,
      )
    },
    // confirmer une commande
    async confirmOrder(userId, address = null) {
      try {
        const data = {
          userId: userId,
          products: [],
          status: 'En cours de traitement',
        }
        // Remplit le tableau `products` avec les données du panier
        this.orderProduct.forEach((produit) => {
          data.products.push({
            productId: produit.id,
            quantity: produit.quantity,
            price: produit.price,
          })
        })

        if (address) data.deliveryAddress = address
        // Envoie la commande à l'API
        const response = await VivoBack.createOrder(data)
        // Vide le panier
        this.viderPanier()
        return true
      } catch (error) {
        console.error('Erreur lors de la confirmation de la commande:', error)
        return false
      }
    },
  },
})
