<template>
  <div
    class="col-12 col-md-10 col-lg-8 p-1 bg-dark bg-gradient rounded border border-warning shadow-lg justify-content-center align-items-center overflow-auto mainContent"
  >
    <h3 class="w-100 text-center mb-4 display-4">Historique des commandes</h3>
    <div>
      <Loader v-if="loading" />
      <p v-else-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <p v-else-if="!order.length" class="text-info">Aucune commande trouvée</p>
      <div v-for="orderItem in order" :key="orderItem._id">
        <section v-if="orderItem.status !== 'En attente'">
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
            Livraison
            <span class="text-warning">{{
              orderItem.deliveryAddress ? orderItem.deliveryAddress : 'Aucunes'
            }}</span>
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
              <RouterLink :to="`/order/${orderItem._id}`">
                <button class="btn btn-primary">Voir détails</button>
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
      <button
        v-if="page < totalPages && !loading"
        @click="loadMore"
        class="btn btn-outline-warning d-block mx-auto mt-3"
      >
        Charger plus de commandes
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'
import Loader from '@/components/Loader.vue'

// Récupération du store User
const userStore = useUserStore()

const user = ref(null)
const order = ref([])
const errorMessage = ref('')
const loading = ref(true)
const page = ref(1)
const totalPages = ref(1)

onMounted(async () => {
  loading.value = true
  await getOrders()
})
const getOrders = async () => {
  try {
    await userStore.chargerUtilisateur()
    user.value = userStore.utilisateur

    if (user.value) {
      const response = await userStore.getOrders(user.value.id, page.value)
      const data = Array.isArray(response.data) ? response.data.reverse() : []
      order.value.push(...data)
      order.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      totalPages.value = response.totalPages
    } else {
      errorMessage.value = 'Utilisateur non connecté'
    }
  } catch (error) {
    if (error.message === 'Token invalide ou expiré') {
      errorMessage.value = 'Connexion expirée'
    } else {
      errorMessage.value = 'Une erreur est survenue lors de la récupération des commandes.'
      console.error('Erreur lors de la récupération des commandes :', error)
    }
  } finally {
    loading.value = false
  }
}
const loadMore = async () => {
  page.value++
  await getOrders()
}
</script>

<style>
.mainContent {
  max-height: 800px;
  color: aliceblue;
}
</style>
