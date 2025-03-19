<template>
  <h1>{{ name.toUpperCase() }}</h1>
  <p>
    compteur : <span>{{ count }}</span>
  </p>
  <div v-show="count >= 5">Vous avez cliqué 5 fois</div>
  <button @click="count++">Increment</button>
  <button @click="count--">Decrement</button>
  <br />
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
import VivoBack from '../services/VivoBack.js'

const name = 'john'
let count = ref(0)
const products = ref([])

onMounted(async () => {
  try {
    products.value = await VivoBack.getProducts()
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error.message)
  }
})
</script>

<style>
h1 {
  color: red;
}
</style>
