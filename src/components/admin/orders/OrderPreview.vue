<template>
  <div class="bg-secondary bg-gradient mb-4">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div
      v-else
      class="p-4 d-flex gap-3 flex-column flex-md-row align-items-center bg-dark bg-gradient border rounded mb-4"
    >
      <select v-model="filter" name="status">
        <option value="En cours de traitement">En cours de traitement</option>
        <option value="Confirmée">Confirmée</option>
        <option value="Prêt en magasin">Prêt en magasin</option>
        <option value="Refusée">Refusée</option>
        <option value="Annulée">Annulée</option>
      </select>
      <select v-model="limit" name="limit">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div class="d-flex gap-2">
        <button
          class="btn btn-outline-warning"
          title="Précédent"
          @click="page > 1 && page--"
          :disabled="page <= 1"
        >
          ⬅️
        </button>
        <button
          class="btn btn-outline-warning"
          title="Suivant"
          @click="page < totalPages && page++"
          :disabled="page >= totalPages"
        >
          ➡️
        </button>
      </div>
      <p>Page {{ page }} sur {{ totalPages }}</p>
      <p>Résultats: {{ total }}</p>
    </div>
    <Loader v-if="isLoading" />
    <transition name="fade">
      <div class="container" v-if="orders.length && !isLoading">
        <div class="row gap-1 justify-content-center">
          <div
            v-for="order in orders"
            class="col-12 col-md-5 p-4 my-2 alert alert-primary"
            :key="order._id"
          >
            <p class="text-center">
              Numéro de commande: <span class="text-primary">{{ order._id }}</span>
            </p>
            <p class="text-center">
              {{ order.deliveryAddress ? order.deliveryAddress : 'Récupération en magasin' }}
            </p>
            <p class="text-center">
              Date: <span class="text-warning">{{ formatDate(order.createdAt) }}</span>
            </p>
            <RouterLink :to="`/order/${order._id}`" class="">
              <button class="btn btn-primary d-block mx-auto">Voir détails</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-else-if="!orders.length && !isLoading" class="container p-4">
        <p class="text-center alert alert-info">Aucune commande</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import Loader from '@/components/Loader.vue'
const VivoBack = inject('VivoBack')
const isLoading = ref(false)
const errorMessage = ref('')
const orders = ref([])
const total = ref(0)
const totalPages = ref(0)

const page = ref(1)
watch(page, () => {
  isLoading.value = true
  getOrders()
})

const limit = ref(10)
watch(limit, () => {
  page.value = 1
  isLoading.value = true
  getOrders()
})

const filter = ref('En cours de traitement')
watch(filter, () => {
  page.value = 1
  isLoading.value = true
  getOrders()
})

onMounted(async () => {
  isLoading.value = true
  getOrders()
})

const getOrders = async () => {
  try {
    orders.value = []
    const response = await VivoBack.getOrdersByStatus(filter.value, page.value, limit.value)
    orders.value = response.data
    total.value = response.total
    totalPages.value = response.totalPages
  } catch (error) {
    console.error(error)
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
}
const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleString('fr-FR', options)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  max-height: 650px;
  overflow-y: auto;
}
</style>
