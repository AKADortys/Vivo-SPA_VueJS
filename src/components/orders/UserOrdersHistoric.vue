<template>
  <div
    class="col-12 col-md-8 col-lg-7 p-2 bg-dark bg-gradient rounded border border-warning text-white shadow-lg d-flex flex-wrap justify-content-center align-items-center overflow-auto mainContent"
  >
    <h3 class="w-75 text-center mb-4">Historique des commandes</h3>
    <div>
      <p v-if="loading">Chargement...</p>
      <p v-else-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <p v-else-if="!order.length" class="text-info">Aucune commande trouvée</p>
      <div v-for="orderItem in order" :key="orderItem._id" class="">
        <section
          v-if="orderItem.status !== 'En attente' && orderItem.status !== 'En cours de traitement'"
        >
          <h4 class="text-primary text-center">
            Commande du
            {{
              new Date(orderItem.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}
          </h4>
          <p class="text-center mb-2">
            Livraison <span class="text-warning">{{ orderItem.deliveryAddress }}</span>
          </p>
          <p class="text-center mb-2">
            Statut <span class="text-warning">{{ orderItem.status }}</span>
          </p>
          <p class="text-center mb-2">
            N° commande <span class="text-warning">{{ orderItem._id }}</span>
          </p>
          <div
            class="d-flex flex-wrap align-items-center justify-content-center border-bottom mb-3 py-2"
          >
            <div class="d-flex gap-4">
              <p class="text-center">
                Total <span class="text-warning">{{ orderItem.totalPrice }} €</span>
              </p>
              <RouterLink :to="`order/${orderItem._id}`">
                <button class="btn btn-primary">Voir détails</button>
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VivoBack from '@/services/VivoBack.js'

const user = ref({})
const order = ref([])
const errorMessage = ref('')
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const data = sessionStorage.getItem('currentUser')

  if (data) {
    user.value = JSON.parse(data)
    try {
      const response = await VivoBack.getUserOrders(user.value._id)
      order.value = Array.isArray(response) ? response : []
    } catch (error) {
      if (error.message === 'Token invalide ou expiré') {
        errorMessage.value = 'Connexion expirée'
        sessionStorage.removeItem('currentUser')
        window.location.reload()
      } else {
        errorMessage.value = 'Une erreur est survenue lors de la récupération des commandes.'
        console.error('Erreur lors de la récupération des commandes :', error)
      }
    }
  } else {
    errorMessage.value = 'Utilisateur non connecté'
  }

  loading.value = false
})
</script>

<style>
.mainContent {
  max-height: 400px;
}
</style>
