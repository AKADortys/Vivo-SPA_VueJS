<script setup>
import { ref, onMounted, inject } from 'vue'
import { usePanierStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import LogPanel from '@/components/auth/LogPanel.vue'

const userStore = useUserStore()
const panierStore = usePanierStore()
const address = ref(null)

// Charger le panier depuis Dexie au montage du composant
onMounted(async () => {
  await panierStore.chargerPanier()
  await userStore.chargerUtilisateur()
})

const supprimerProduit = (id) => {
  panierStore.supprimerProduit(id)
}

const viderPanier = () => {
  panierStore.viderPanier()
}

const confirm = () => {
  panierStore.confirmOrder(userStore.utilisateur.id, address.value ? address.value : null)
}
</script>

<template>
  <div v-if="!userStore.utilisateur" class="bg-dark bg-gradient p-4 mt-2 rounded border">
    <p class="text-warning text-center mb-3">
      Pour passer commande, connectez vous ou créez un compte
    </p>
    <LogPanel />
  </div>
  <div v-else-if="!panierStore.produits.length">
    <table class="my-4 p-2 table-dark table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="text-center">Aucun produit dans le panier</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <table class="my-2 p-2 table-dark table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produit in panierStore.produits" :key="produit.id">
          <td class="text-warning">{{ produit.label }}</td>
          <td class="text-primary">{{ produit.price }}€</td>
          <td class="text-primary">
            {{ produit.quantity }}
          </td>
          <td>
            <button class="btn" @click="supprimerProduit(produit.id)">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-warning border-bottom text-center mb-2 display-6">
      Total de la commande : <span class="text-primary">{{ panierStore.total }}€</span>
    </p>
    <p class="d-flex gap-3 justify-content-center p-2">
      <label for="address">Addresse de livraison</label>
      <input v-model="address" name="address" type="text" />
    </p>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-danger" @click="viderPanier()">Vider le panier</button>
      <button class="btn btn-success" @click="confirm()">Confirmer la commande</button>
    </div>
  </div>
</template>
