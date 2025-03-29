<script setup>
import { onMounted } from 'vue'
import { usePanierStore } from '@/store/cartStore'

const panierStore = usePanierStore()

// Charger le panier depuis Dexie au montage du composant
onMounted(() => {
  panierStore.chargerPanier()
})

const supprimerProduit = (id) => {
  panierStore.supprimerProduit(id)
}

const viderPanier = () => {
  panierStore.viderPanier()
}
</script>

<template>
  <div>
    <h2>Mon Panier</h2>
    <ul>
      <li v-for="produit in panierStore.produits" :key="produit.id">
        {{ produit.label }} - {{ produit.price }}€ x {{ produit.quantity }}
        <button class="btn" @click="supprimerProduit(produit.id)">❌</button>
      </li>
    </ul>
    <button class="btn btn-danger" @click="viderPanier">Vider le panier</button>
  </div>
</template>
