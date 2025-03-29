<template>
  <div class="col-12">
    <div
      v-if="products.length"
      v-for="cat in category"
      :key="cat"
      class="bg-dark p-2 border border-warning rounded mt-2"
    >
      <h2 class="text-center text-warning">{{ cat }}</h2>
      <div class="d-flex flex-wrap gap-2 justify-content-center">
        <div
          v-for="product in filteredProducts[cat]"
          :key="product._id"
          class="card bg-secondary bg-gradient p-2 col-12 col-md-5 text-center"
        >
          <h3 class="text-white">{{ product.label }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">Prix : {{ product.price }} €</p>
          <div
            class="d-flex justify-content-center gap-1 p-2 mt-2 mx-auto mt-2 bg-dark rounded border border-warning"
          >
            <button @click="addToCart(product)" class="btn btn-warning">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <p v-else>Chargement des produits...</p>
  </div>
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
