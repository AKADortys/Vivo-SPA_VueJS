<template>
  <div class="container" v-if="isLoading">
    <Loader />
  </div>
  <div v-else-if="products.length" class="col-12">
    <table class="table table-dark">
      <thead class="bg-secondary">
        <tr>
          <th>Label</th>
          <th>Prix</th>
          <th>Catégorie</th>
          <th>disponible</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>
            {{ product.label }}
          </td>
          <td>
            {{ product.price }}
          </td>
          <td>
            {{ product.category }}
          </td>
          <td>
            <input
              type="checkbox"
              :checked="product.available"
              @change="setAvailable(product)"
              class="form-check-input"
            />
            <span class="ms-2">{{ product.available ? 'Oui' : 'Non' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p class="alert alert-danger p-4">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import Loader from '@/components/Loader.vue'

const VivoBack = inject('VivoBack')
const isLoading = ref(false)
const errorMessage = ref('')
const products = ref([])

onMounted(async () => {
  await getProducts()
})

const getProducts = async () => {
  if (isLoading.value) return
  try {
    isLoading.value = true
    const response = await VivoBack.getProducts()
    products.value = response
  } catch (error) {
    console.error(error)
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
}

const setAvailable = async (product) => {
  const updatedProd = products.value.find((item) => item._id === product._id)
  try {
    const response = await VivoBack.updateProduct(updatedProd._id, {
      available: !updatedProd.available,
    })
    updatedProd.available = !updatedProd.available
  } catch (error) {
    console.error(error)
    errorMessage.value = error
  }
}
</script>
