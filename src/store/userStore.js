import { defineStore } from 'pinia'
import Dexie from 'dexie'
import VivoBack from '@/services/VivoBack'

// Durée de validité des données
const TTL_HOURS = 168
const TTL_MS = TTL_HOURS * 60 * 60 * 1000

// Création de la base IndexedDB
const db = new Dexie('VivoUser')

db.version(1).stores({
  utilisateurs: 'id, name, lastName, mail, phone, role, createdAt, expiresAt', // Ajout de expiresAt
})

export const useUserStore = defineStore('user', {
  state: () => ({
    utilisateur: null,
  }),
  actions: {
    // Charger l'utilisateur avec vérification du TTL
    async chargerUtilisateur() {
      try {
        const utilisateurs = await db.utilisateurs.toArray()

        if (utilisateurs.length) {
          const utilisateur = utilisateurs[0]
          const now = Date.now()

          // Vérifier si les données sont expirées
          if (utilisateur.expiresAt && utilisateur.expiresAt < now) {
            console.warn('Utilisateur expiré, suppression des données...')
            await db.utilisateurs.clear()
            this.utilisateur = null
          } else {
            this.utilisateur = utilisateur
          }
        } else {
          this.utilisateur = null
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l’utilisateur depuis IndexedDB:', error)
      }
    },

    // Inscription avec TTL
    async register(data) {
      try {
        const response = await VivoBack.register(data)
        if (response.user && response.user._doc._id) {
          const expiration = Date.now() + TTL_MS // Calcul du TTL
          const user = {
            id: response.user._doc._id,
            name: response.user._doc.name,
            lastName: response.user._doc.lastName,
            mail: response.user._doc.mail,
            phone: response.user._doc.phone,
            role: response.user._doc.role,
            createdAt: response.user._doc.createdAt,
            expiresAt: expiration, // Ajout du TTL
          }
          await db.utilisateurs.clear()
          await db.utilisateurs.add(user)
          this.utilisateur = user

          return true
        } else {
          console.error('Erreur: _id manquant dans la réponse.')
          return false
        }
      } catch (err) {
        console.error('Erreur lors de l’inscription:', err)
        return false
      }
    },

    // Authentification avec TTL
    async authenticate(data) {
      try {
        const response = await VivoBack.login(data)
        if (response.user && response.user._id) {
          const expiration = Date.now() + TTL_MS // Calcul du TTL
          const user = {
            id: response.user._id,
            name: response.user.name,
            lastName: response.user.lastName,
            mail: response.user.mail,
            phone: response.user.phone,
            role: response.user.role,
            createdAt: response.user.createdAt,
            expiresAt: expiration, // Ajout du TTL
          }
          await db.utilisateurs.clear()
          await db.utilisateurs.add(user)

          this.utilisateur = user
          return true
        } else {
          console.error('Erreur: _id manquant dans la réponse.')
          return false
        }
      } catch (error) {
        console.error('Erreur lors de l’authentification:', error)
        return false
      }
    },

    // Déconnexion de l'utilisateur
    async logout() {
      try {
        await VivoBack.logout()
        this.utilisateur = null
        await db.utilisateurs.clear()
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    },

    // Mettre à jour un utilisateur en conservant le TTL
    async updateUser(idUser, data) {
      try {
        const response = await VivoBack.updateUser(idUser, data)

        const existant = await db.utilisateurs.get(idUser)
        if (existant) {
          const updatedUser = {
            ...existant,
            ...response.user, // Remplace par les nouvelles données
          }
          await db.utilisateurs.put(updatedUser)
          this.utilisateur = updatedUser
          return true
        }
        return false
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
        return false
      }
    },
    // getuser orders
    async getOrders(idUser, page, limit) {
      try {
        const response = await VivoBack.getUserOrders(idUser, page, limit)
        return response
      } catch (error) {
        console.error('Error getting orders:', error)
        throw error.message || error
      }
    },
  },
})
