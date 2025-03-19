<template>
  <div>
    <h2>Produits :</h2>
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.label }} - {{ product.price }}€
      </li>
    </ul>
    <p v-else>Chargement des produits...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VivoBack from '@/services/VivoBack.js'
const products = ref([])

onMounted(async () => {
  try {
    products.value = await VivoBack.getProducts()
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error.message)
  }
})
</script>
