<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import Loader from '@/components/Loader.vue'

const UserStore = useUserStore()
const VivoBack = inject('VivoBack')
const router = useRouter()

const route = useRoute()
const id = route.params.id
const user = ref({})
const order = ref(null)
const products = ref([])
const errorMessage = ref('')
const loading = ref(true)

onMounted(async () => {
  await UserStore.chargerUtilisateur()
  errorMessage.value = ''
  if (!UserStore.utilisateur) {
    errorMessage.value = 'Veuillez vous connecter pour accéder à cette page.'
    return
  }
  try {
    order.value = await VivoBack.getOrderById(id)
    user.value = UserStore.utilisateur
    const response = await VivoBack.getProducts()
    products.value = response
  } catch (error) {
    router.push('/')
    alert('Un problème est survenu !')
    console.error(error)
  } finally {
    loading.value = false
  }
})

// Fonction pour récupérer le label d'un produit via son ID
const getProductLabel = (productId) => {
  const product = products.value.find((p) => p._id === productId)
  return product ? product.label : 'Produit inconnu'
}
</script>

<template>
  <div v-if="order" class="row justify-content-center gap-4">
    <div class="col-10 my-4 alert alert-info">
      <h4 class="text-primary text-center">
        Commande du
        {{
          new Date(order.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}
      </h4>
      <p class="mb-2">
        Livraison
        <span class="text-primary">{{
          order.deliveryAddress ? order.deliveryAddress : 'Aucune'
        }}</span>
      </p>
      <p class="mb-2">
        Statut <span class="text-primary">{{ order.status }}</span>
      </p>
      <p class="mb-2">
        N° commande <span class="text-primary">{{ order._id }}</span>
      </p>
    </div>
    <!-- Liste des produits -->
    <div
      v-for="orderItem in order.products"
      :key="orderItem._id"
      class="card bg-secondary bg-gradient text-white py-2 col-12 col-md-6 col-lg-3"
    >
      <h5 class="text-center card-header">
        Produit : <span class="text-primary">{{ getProductLabel(orderItem.productId) }}</span>
      </h5>
      <p class="card-text mb-1">
        Quantité : <span class="text-warning">{{ orderItem.quantity }}</span>
      </p>
      <p class="card-text mb-1">
        Prix unitaire : <span class="text-warning">{{ orderItem.price }} €</span>
      </p>
      <p class="card-text mb-1">
        Total :
        <span class="text-warning">{{ (orderItem.quantity * orderItem.price).toFixed(2) }} €</span>
      </p>
    </div>

    <div class="p-2 text-center rounded bg-dark bg-gradient border border-warning col-10">
      <h4 class="text-primary">
        Total de la commande : <span class="text-warning">{{ order.totalPrice }} €</span>
      </h4>
    </div>
  </div>
  <div v-else-if="errorMessage" class="row">
    <div class="col-12">
      <p class="text-center">{{ errorMessage }}</p>
    </div>
  </div>
  <div v-else-if="loading" class="row">
    <div class="col-12 text-center">
      <Loader />
    </div>
  </div>
</template>
