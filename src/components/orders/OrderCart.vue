<script setup>
import { onMounted, inject } from 'vue'
import { usePanierStore } from '@/store/cartStore'

const panierStore = usePanierStore()
const VivoBack = inject('VivoBack')
// Charger le panier depuis Dexie au montage du composant
onMounted(async () => {
  await panierStore.chargerPanier()
})

const supprimerProduit = (id) => {
  panierStore.supprimerProduit(id)
}

const viderPanier = () => {
  panierStore.viderPanier()
}

const confirm = () => {
  const products = panierStore.produits
  console.log(products)
}
</script>

<template>
  <div v-if="!panierStore.produits.length">
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
    <p class="text-warning border-bottom text-center mb-2 p-2">Total : {{ panierStore.total }}</p>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-danger" @click="viderPanier()">Vider le panier</button>
      <button class="btn btn-success" @click="confirm()">Confirmer la commande</button>
    </div>
  </div>
</template>
