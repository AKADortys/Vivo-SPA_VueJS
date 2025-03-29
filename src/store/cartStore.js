import { defineStore } from 'pinia'
import Dexie from 'dexie'

// Création de la base de données IndexedDB
const db = new Dexie('Vivo')
db.version(1).stores({
  panier: 'id, label, price, quantity',
})

export const usePanierStore = defineStore('panier', {
  state: () => ({
    produits: [],
  }),

  actions: {
    // Charger les produits depuis Dexie au démarrage
    async chargerPanier() {
      this.produits = await db.panier.toArray()
    },

    async ajouterProduit(produit) {
      const existant = await db.panier.get(produit.id)

      if (existant) {
        existant.quantity += 1 // Incrémente la quantité
        await db.panier.put(existant) // Met à jour IndexedDB

        // Met à jour le tableau `produits` en trouvant l'index du produit
        this.produits = this.produits.map((p) => (p.id === existant.id ? existant : p))
      } else {
        produit.quantity = 1 // Initialise la quantité
        await db.panier.add(produit) // Ajoute dans IndexedDB

        // Ajoute au state local
        this.produits.push(produit)
      }
    },
    // Supprimer un produit du panier
    async supprimerProduit(id) {
      this.produits = this.produits.filter((p) => p.id !== id)
      await db.panier.delete(id) // Supprime de IndexedDB
    },

    // Vider complètement le panier
    async viderPanier() {
      this.produits = []
      await db.panier.clear()
    },
  },
})
