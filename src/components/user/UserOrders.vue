<template>
  <div
    class="bg-dark bg-gradient rounded border border-warning text-white shadow-lg d-flex flex-wrap justify-content-center align-items-center"
  >
    <h3 class="w-75 text-center">Historique des commandes</h3>
    <div>
      <p v-if="loading">Chargement...</p>
      <p v-else-if="errorMessage" class="text-danger">Erreur : {{ errorMessage }}</p>
      <p v-else-if="!order.length" class="text-info">Aucune commande trouvée</p>
      <div v-else v-for="orderItem in order" :key="orderItem._id" class="">
        <h4 class="text-primary">
          Commande du
          {{
            new Date(orderItem.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </h4>
        <div class="d-flex align-items-center gap-5 border-bottom mb-3 py-2">
          <p>Total : {{ orderItem.totalPrice }} €</p>
          <p>Livraison : {{ orderItem.deliveryAddress }}</p>
          <button class="btn btn-primary">Voir détails</button>
        </div>
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
      console.log('Commandes récupérées :', order.value)
    } catch (error) {
      errorMessage.value =
        error.message || 'Une erreur est survenue lors de la récupération des commandes.'
      console.error('Erreur lors de la récupération des commandes :', error)
    }
  } else {
    errorMessage.value = 'Utilisateur non connecté'
    console.error('Utilisateur non connecté')
  }

  loading.value = false
})
</script>
