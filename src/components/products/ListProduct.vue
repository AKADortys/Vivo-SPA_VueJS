<template>
  <div class="col-12">
    <div
      v-if="products.length"
      v-for="cat in category"
      :key="cat"
      class="bg-dark p-2 border border-warning rounded mt-2"
    >
      <h2 class="text-center text-warning">{{ cat }}</h2>
      <div class="d-flex flex-wrap">
        <div
          v-for="product in filteredProducts(cat)"
          :key="product._id"
          class="card bg-secondary bg-gradient p-2 col-12 col-md-6"
        >
          <h3 class="text-white">{{ product.label }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">Prix : {{ product.price }} €</p>
        </div>
      </div>
    </div>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <p v-else>Chargement des produits...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VivoBack from '@/services/VivoBack.js'

const errorMessage = ref(null)
const products = ref([])
const category = ref(['Plat principal', 'Dessert', 'Boisson', 'Divers'])

onMounted(async () => {
  try {
    products.value = await VivoBack.getProducts()
  } catch (error) {
    if (error === 'Network Error') return (errorMessage.value = 'Une erreur réseau est survenue')
    errorMessage.value = error.errorMessage
    console.error('Erreur lors du chargement des produits:', error.message)
  }
})

// Filtrer les produits par catégorie et disponibilité
const filteredProducts = (cat) => {
  return products.value.filter((product) => product.category === cat && product.available)
}
</script>
