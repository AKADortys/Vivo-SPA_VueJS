<template>
  <div
    v-if="products.length"
    v-for="cat in category"
    :key="cat"
    class="bg-dark bg-gradient p-2 rounded border"
  >
    <h2 class="mb-4 text-center text-warning display-2">{{ cat }}</h2>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <div
        v-for="product in filteredProducts[cat]"
        :key="product._id"
        class="card bg-secondary bg-gradient p-2 col-12 col-md-5 text-center pe-auto user-select-none product-card"
        @click="addToCart(product)"
      >
        <h3 class="text-white">{{ product.label }}</h3>
        <p class="text-warning">{{ product.description }}</p>
        <p class="text-warning">Prix : {{ product.price }} €</p>
      </div>
    </div>
  </div>
  <p v-else-if="errorMessage">{{ errorMessage }}</p>
  <p v-else>Chargement des produits...</p>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { usePanierStore } from '@/store/cartStore'

const panierStore = usePanierStore()
const VivoBack = inject('VivoBack')

const errorMessage = ref(null)
const products = ref([])
const category = ref(['Plat principal', 'Dessert', 'Boisson', 'Divers'])

onMounted(async () => {
  try {
    const response = await VivoBack.getProducts()
    products.value = response
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error)
    errorMessage.value = error.response?.data?.message || 'Une erreur réseau est survenue'
  }
})

const filteredProducts = computed(() => {
  const grouped = {}
  category.value.forEach((cat) => {
    grouped[cat] = products.value.filter((p) => p.category === cat && p.available)
  })
  return grouped
})

const addToCart = (product) => {
  console.log(`Ajout de ${product.label} au panier`)
  const formatProduct = {
    id: product._id,
    label: product.label,
    price: product.price,
    quantity: 1,
  }
  panierStore.ajouterProduit(formatProduct)
}
</script>

<style>
.product-card {
  cursor: pointer;
  transition:
    border 0.1s ease,
    transform 0.2s ease;
}

.product-card:hover {
  border: gold solid 0.1em;
  transform: scale(1.1);
  z-index: 1;
}
</style>
