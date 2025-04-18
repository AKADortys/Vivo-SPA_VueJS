<template>
  <div class="d-flex flex-column">
    <div
      class="p-4 my-2 mx-auto w-75 d-flex gap-3 flex-column flex-md-row align-items-center bg-dark bg-gradient border border-warning rounded mb-4"
    >
      <select v-model="filter" class="rounded" name="status">
        <option value="En cours de traitement">En cours de traitement</option>
        <option value="Confirmée">Confirmée</option>
        <option value="Prêt en magasin">Prêt en magasin</option>
        <option value="Refusée">Refusée</option>
        <option value="Annulée">Annulée</option>
      </select>
      <select v-model="limit" class="rounded" name="limit">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div class="d-flex gap-2">
        <button
          @click="getOrders"
          class="btn btn-outline-warning"
          title="Rafraîchir"
          :disabled="isLoading"
          aria-label="Rafraîchir"
        >
          🔁
        </button>
        <button
          class="btn btn-outline-warning"
          title="Précédent"
          @click="page > 1 && page--"
          :disabled="page <= 1"
          aria-label="Page précédente"
        >
          ⬅️
        </button>
        <button
          class="btn btn-outline-warning"
          title="Suivant"
          @click="page < totalPages && page++"
          :disabled="page >= totalPages"
          aria-label="Page suivante"
        >
          ➡️
        </button>
      </div>
      <p>Page {{ page }} sur {{ totalPages }}</p>
      <p>
        Résultat(s) <span class="alert alert-info p-1">{{ total }}</span>
      </p>
    </div>
    <Loader v-if="isLoading" />
    <p v-else-if="errorMessage" class="alert alert-danger text-center">{{ errorMessage }}</p>
    <transition name="fade">
      <div class="container mb-4" v-if="orders.length && !isLoading">
        <div class="row justify-content-center gap-4">
          <div
            v-for="order in orders"
            class="col-12 col-md-4 col-lg-3 p-2 alert alert-secondary shadow-lg"
            :key="order._id"
          >
            <p class="mb-1">
              Numéro de commande: <span class="text-primary">{{ order._id }}</span>
            </p>
            <p class="mb-1">
              {{ order.deliveryAddress ? order.deliveryAddress : 'Récupération en magasin' }}
            </p>
            <p class="mb-1">
              Date: <span class="text-primary">{{ formatDate(order.createdAt) }}</span>
            </p>
            <p class="mb-1">
              Nombre d'article: <span class="text-primary">{{ order.products.length }}</span>
            </p>
            <button class="btn btn-primary d-block mx-auto my-2" @click="loadOrder(order._id)">
              Voir détails
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="!orders.length && !isLoading && !errorMessage" class="container p-4">
        <p class="text-center alert alert-info">Aucune commande</p>
      </div>
    </transition>
    <button class="btn btn-danger" title="Fermer" v-if="details" @click="details = null">✖️</button>
    <OrderPanel
      v-if="details && Object.keys(details).length"
      :order="details"
      ref="orderPanelRef"
      @valid="showAlert('Commande Modifié !', 'La commande a été validée avec succès', 'success')"
      @invalid="showAlert('Commande Modifié !', 'La commande a été réfusée avec succès', 'success')"
      @error="showAlert('Un problème est survenue', 'Une erreur réseau est survenue', 'danger')"
    />
  </div>
  <Alert
    v-if="alertAs.show"
    :title="alertAs.title"
    :message="alertAs.message"
    :type="alertAs.type"
    :show="alertAs.show"
  />
</template>

<script setup>
import { ref, onMounted, inject, watch, nextTick } from 'vue'
import Loader from '@/components/Loader.vue'
import OrderPanel from '@/components/admin/orders/OrderPanel.vue'
import Alert from '@/components/Alert-G.vue'

const VivoBack = inject('VivoBack')
const orderPanelRef = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const orders = ref([])
const total = ref(0)
const totalPages = ref(0)
const details = ref(null)
const alertAs = ref({
  show: false,
  title: '',
  message: '',
  type: '', // ex: alert-success, alert-danger
})

const page = ref(1)
watch(page, () => {
  getOrders()
})

const limit = ref(10)
const filter = ref('En cours de traitement')
watch([limit, filter], () => {
  page.value = 1
  getOrders()
})

onMounted(async () => {
  getOrders()
})

const getOrders = async () => {
  try {
    if (isLoading.value) return
    isLoading.value = true
    errorMessage.value = ''

    orders.value = []
    const response = await VivoBack.getOrdersByStatus(filter.value, page.value, limit.value)
    orders.value = response.data
    total.value = response.total
    totalPages.value = response.totalPages
  } catch (error) {
    console.error(error)
    errorMessage.value = error.message || 'Erreur Réseau'
  } finally {
    isLoading.value = false
  }
}

const loadOrder = async (id) => {
  try {
    const response = await VivoBack.getOrderFull(id)
    details.value = response
    nextTick(() => {
      if (orderPanelRef.value) {
        orderPanelRef.value.$el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  }
}

const showAlert = async (title, message, type = 'info') => {
  alertAs.value = {
    show: true,
    title,
    message,
    type,
  }
  await getOrders()
  details.value = null
  setTimeout(() => {
    alertAs.value.show = false
  }, 5000)
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
</style>
