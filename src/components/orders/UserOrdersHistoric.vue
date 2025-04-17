<template>
  <h3 class="w-100 text-center mb-4 display-4 titre text-white">Historique des commandes</h3>
  <p v-if="total" class="text-center text-white mb-4">
    <span class="p-1 alert alert-warning">{{ total }}</span> Résultat(s)
  </p>
  <div
    class="col-12 col-md-10 col-lg-8 mx-auto my-4 p-1 bg-dark bg-gradient rounded border shadow-lg justify-content-center align-items-center overflow-auto mainContent"
  >
    <div>
      <Loader v-if="loading" />
      <p v-else-if="errorMessage" class="text-danger p-4 text-center">{{ errorMessage }}</p>
      <div v-else>
        <div v-if="!order.length" class="text-info text-center p-4">Aucune commande trouvée</div>
        <div v-else v-for="orderItem in order" :key="orderItem._id" class="text-white">
          <section>
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
            <p class="mb-2">
              Livraison
              <span class="text-info">{{
                orderItem.deliveryAddress ? orderItem.deliveryAddress : 'Aucune'
              }}</span>
            </p>
            <p class="mb-2">
              Statut <span class="text-warning">{{ orderItem.status }}</span>
            </p>
            <p class="mb-2">
              N° commande <span class="text-warning">{{ orderItem._id }}</span>
            </p>
            <p class="mb-2">
              Total d'articles <span>{{ orderItem.products.length }}</span>
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
      </div>
      <button
        v-if="page < totalPages && !loading"
        @click="loadMore"
        class="btn btn-outline-warning d-block mx-auto mt-3"
      >
        Charger plus de commandes <br />
        Page {{ page }} sur {{ totalPages }}
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
const total = ref(0)

onMounted(async () => {
  loading.value = true
  await userStore.chargerUtilisateur()
  user.value = userStore.utilisateur
  if (user.value) {
    await getOrders()
  } else {
    loading.value = false
    errorMessage.value = 'Utilisateur non trouvé'
  }
})

const getOrders = async () => {
  try {
    if (user.value) {
      const response = await userStore.getOrders(user.value.id, page.value)
      const data = Array.isArray(response.data) ? response.data : []
      order.value.push(...data)
      totalPages.value = response.totalPages
      total.value = response.total
    }
  } catch (error) {
    errorMessage.value = error.message ?? 'Network Error'
    console.error(error)
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  if (page.value < totalPages.value) {
    loading.value = true
    page.value++
    await getOrders()
  }
}
</script>
