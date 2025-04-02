import { defineStore } from 'pinia'
import Dexie from 'dexie'
import VivoBack from '@/services/VivoBack'

// Création de la base de données
const db = new Dexie('VivoCart')
db.version(1).stores({
  panier: 'id, label, price, quantity',
})

export const usePanierStore = defineStore('panier', {
  state: () => ({
    produits: [],
    total: 0,
  }),

  actions: {
    // Charger les produits depuis Dexie au démarrage
    async chargerPanier() {
      this.produits = await db.panier.toArray()
      this.calculerTotal()
    },

    async ajouterProduit(produit) {
      const existant = await db.panier.get(produit.id)

      if (existant) {
        existant.quantity += 1 // Incrémente la quantité
        await db.panier.put(existant) // Met à jour IndexedDB

        // Met à jour le tableau `produits` en trouvant l'index du produit
        this.produits = this.produits.map((p) => (p.id === existant.id ? existant : p))
        this.calculerTotal()
      } else {
        produit.quantity = 1 // Initialise la quantité
        await db.panier.add(produit) // Ajoute dans IndexedDB

        // Ajoute au state local
        this.produits.push(produit)
        this.calculerTotal()
      }
    },
    // Supprimer un produit du panier
    async supprimerProduit(id) {
      this.produits = this.produits.filter((p) => p.id !== id)
      await db.panier.delete(id) // Supprime de IndexedDB
      this.calculerTotal()
    },

    // Vider complètement le panier
    async viderPanier() {
      this.produits = []
      await db.panier.clear()
      this.total = 0 // Met à jour le total en vide
    },
    // Calculer le total du panier
    async calculerTotal() {
      this.total = this.produits.reduce(
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
        this.produits.forEach((produit) => {
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
