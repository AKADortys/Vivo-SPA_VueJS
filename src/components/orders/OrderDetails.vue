<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const VivoBack = inject('VivoBack')
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
const router = useRouter()

if (!currentUser) {
  router.push('/')
}

const route = useRoute()
const id = route.params.id
const user = ref({})
const order = ref({})
const products = ref({})
const errorMessage = ref('')
const loading = ref(true)

onMounted(async () => {
  errorMessage.value = ''
  const data = JSON.parse(sessionStorage.getItem('currentUser'))
  if (!data) {
    errorMessage.value = 'Veuillez vous connecter pour accéder à cette page.'
    return
  }
  try {
    order.value = await VivoBack.getOrderById(id)
    user.value = data
    products.value = JSON.parse(sessionStorage.getItem('products'))
    loading.value = false
    console.log(products.value, user.value, order.value)
  } catch (error) {
    if (error.message === 'Token invalide ou expiré') {
      errorMessage.value = 'Connexion expirée'
      sessionStorage.removeItem('currentUser')
      window.location.href('/')
    } else {
      errorMessage.value = 'Une erreur est survenue lors de la récupération de la commande.'
      console.error('Erreur lors de la récupération des commandes :', error)
    }
    console.error(error)
  }
})

// Fonction pour récupérer le label d'un produit via son ID
const getProductLabel = (productId) => {
  const product = products.value.find((p) => p._id === productId)
  return product ? product.label : 'Produit inconnu'
}
</script>

<template>
  <div v-if="order" class="row">
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
    <p class="text-center mb-2">
      Livraison <span class="text-warning">{{ order.deliveryAddress }}</span>
    </p>
    <p class="text-center mb-2">
      Statut <span class="text-warning">{{ order.status }}</span>
    </p>
    <p class="text-center mb-2">
      N° commande <span class="text-warning">{{ order._id }}</span>
    </p>

    <!-- Liste des produits -->
    <div
      v-for="orderItem in order.products"
      :key="orderItem._id"
      class="border-bottom mb-3 py-2 col-6"
    >
      <h5 class="text-center">
        Produit : <span class="text-warning">{{ getProductLabel(orderItem.productId) }}</span>
      </h5>
      <p class="text-center">
        Quantité : <span class="text-warning">{{ orderItem.quantity }}</span>
      </p>
      <p class="text-center">
        Prix unitaire : <span class="text-warning">{{ orderItem.price }} €</span>
      </p>
      <p class="text-center">
        Total :
        <span class="text-warning">{{ (orderItem.quantity * orderItem.price).toFixed(2) }} €</span>
      </p>
    </div>

    <div class="text-center">
      <h4>
        Total de la commande : <span class="text-warning">{{ order.totalPrice }} €</span>
      </h4>
    </div>
  </div>
  <div v-else-if="errorMessage" class="row">
    <div class="col-12">
      <p class="text-center">{{ errorMessage.value }}</p>
    </div>
  </div>
  <div v-else-if="loading" class="row">
    <div class="col-12 text-center">
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>
