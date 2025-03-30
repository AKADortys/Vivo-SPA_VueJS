import { defineStore } from 'pinia'
import Dexie from 'dexie'
import VivoBack from '@/services/VivoBack'

// Create the IndexedDB database
const db = new Dexie('VivoUser')

db.version(1).stores({
  utilisateurs: 'id, name, lastName, mail, phone, role, createdAt', // `id` is the primary key
})

export const useUserStore = defineStore('user', {
  state: () => ({
    utilisateur: null,
  }),
  actions: {
    // Load user from IndexedDB
    async chargerUtilisateur() {
      try {
        const utilisateurs = await db.utilisateurs.toArray()
        this.utilisateur = utilisateurs.length ? utilisateurs[0] : null
      } catch (error) {
        console.error('Error loading user from IndexedDB:', error)
      }
    },
    // getuser orders
    async getOrders(idUser) {
      try {
        const response = await VivoBack.getUserOrders(idUser)
        return response
      } catch (error) {
        console.error('Error getting orders:', error)
        return []
      }
    },
    // Register a new user
    async register(data) {
      try {
        const response = await VivoBack.register(data)
        console.log(response.user._doc)
        if (response.user && response.user._doc._id) {
          const user = {
            id: response.user._doc._id,
            name: response.user._doc.name,
            lastName: response.user._doc.lastName,
            mail: response.user._doc.mail,
            phone: response.user._doc.phone,
            role: response.user._doc.role,
            createdAt: response.user._doc.createdAt,
          }
          await db.utilisateurs.clear()
          await db.utilisateurs.add(user)

          this.utilisateur = user
          return true
        } else {
          console.error('Error: _id missing in registration response.')
          return false
        }
      } catch (err) {
        console.error('Error during registration:', err)
        return false
      }
    },
    // Authenticate user
    async authenticate(data) {
      try {
        const response = await VivoBack.login(data)
        if (response.user && response.user._id) {
          const user = {
            id: response.user._id,
            name: response.user.name,
            lastName: response.user.lastName,
            mail: response.user.mail,
            phone: response.user.phone,
            role: response.user.role,
            createdAt: response.user.createdAt,
          }
          await db.utilisateurs.clear()
          await db.utilisateurs.add(user)

          this.utilisateur = user
          return true
        } else {
          console.error('Error: _id missing in login response.')
          return false
        }
      } catch (error) {
        console.error('Error during authentication:', error)
        return false
      }
    },
    // Logout user
    async logout() {
      try {
        this.utilisateur = null
        await db.utilisateurs.clear() // Remove the stored user
      } catch (error) {
        console.error('Error during logout:', error)
      }
    },
    async updateUser(idUser, data) {
      try {
        const response = await VivoBack.updateUser(idUser, data)

        const existant = await db.utilisateurs.get(idUser)
        console.log(response.user)
        if (existant) {
          const updatedUser = {
            id: response.user._id,
            name: response.user.name,
            lastName: response.user.lastName,
            mail: response.user.mail,
            phone: response.user.phone,
            role: response.user.role,
            createdAt: response.user.createdAt,
          }
          await db.utilisateurs.put(updatedUser) // Mise à jour avec les nouvelles données
          this.utilisateur = updatedUser // Mettre à jour l'état utilisateur
          return true
        }
        return false
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
        return false
      }
    },
  },
})
