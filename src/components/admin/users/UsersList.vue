<template>
  <div class="p-2 col-12">
    <!-- filtres-->
    <div
      class="mb-2 p-4 d-flex gap-4 align-items-center flex-column flex-md-row bg-dark bg-gradient border border-warning rounded"
    >
      <div class="d-flex gap-4">
        <label class="visually-hidden" for="searchInput">Recherche utilisateur</label>
        <input
          v-model="searchVal"
          placeholder="Nom, Prénom"
          class="form-control"
          type="text"
          id="searchInput"
        />
        <select name="limit" title="Limite d'utilisateurs" v-model="searchLmt">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="d-flex gap-4">
        <button @click="getUsers" class="btn btn-primary">Recherche</button>
        <button title="Annuler filtre" class="btn btn-outline-danger" @click="reset">❌</button>
        <button
          class="btn btn-outline-warning"
          @click="page--"
          :disabled="page <= 1"
          aria-label="Page précédente"
          title="Page précédente"
        >
          ⬅️
        </button>
        <button
          class="btn btn-outline-warning"
          @click="page++"
          :disabled="page >= totalPage"
          aria-label="Page suivante"
          title="Page suivante"
        >
          ➡️
        </button>
      </div>
      <p class="text-center text-light">Page {{ page }} sur {{ totalPage }}</p>
      <p class="text-center">
        Total utilisateur(s) <span class="text-warning">{{ total }}</span>
      </p>
    </div>
    <!--Chargement-->
    <Loader v-if="isLoading" />
    <!-- Remplace la table par une div -->
    <transition name="fade">
      <div class="container" v-if="!isLoading">
        <div class="row justify-content-around gap-1">
          <div
            v-for="user in users"
            :key="user._id"
            class="p-2 alert alert-secondary shadow-lg col-12 col-md-3"
          >
            <p>
              Nom: <span>{{ user.name }}</span>
            </p>
            <p>
              Prénom: <span>{{ user.lastName }}</span>
            </p>
            <p>
              Téléphone: <span>{{ user.phone }}</span>
            </p>
            <p>
              Email: <span>{{ user.mail }}</span>
            </p>
            <button class="d-block mx-auto my-2 btn btn-primary" @click="getDetails(user._id)">
              Voir détails
            </button>
          </div>
        </div>
        <div v-if="users.length === 0 && errorMessage" key="error" class="alert alert-danger w-100">
          {{ errorMessage }}
        </div>
        <div v-else-if="users.length === 0" key="empty" class="alert alert-info w-100">
          Aucun résultat
        </div>
      </div>
    </transition>
    <div ref="panelScrollAnchor">
      <UserPanel v-if="!errorMessage || users.length" :u="selectedUser" :orders="orders" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch, nextTick } from 'vue'
import Loader from '@/components/Loader.vue'
import UserPanel from '@/components/admin/users/UserPanel.vue'
const VivoBack = inject('VivoBack')

const isLoading = ref(false)
const errorMessage = ref(null)
const users = ref([])
const selectedUser = ref({})
const orders = ref([])

const panelScrollAnchor = ref(null)

const totalPage = ref(0)
const total = ref(0)
const searchVal = ref('')

const page = ref(1)
watch(page, async () => {
  await getUsers()
})

const searchLmt = ref(10)
watch(searchLmt, async () => {
  page.value = 1
  await getUsers()
})

onMounted(async () => {
  await getUsers()
})

const getUsers = async () => {
  try {
    if (isLoading.value) return
    isLoading.value = true
    users.value = []
    const response = await VivoBack.getUsers(page.value, searchLmt.value, searchVal.value)
    const data = Array.isArray(response.data) ? response.data : []
    users.value = data
    page.value = response.page
    totalPage.value = response.totalPages
    total.value = response.total
  } catch (error) {
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
}

const reset = async () => {
  searchVal.value = ''
  searchLmt.value = 10
  errorMessage.value = null
  page.value = 1
  await getUsers()
}

const getDetails = async (userId) => {
  try {
    const response = await VivoBack.getUserOrders(userId)
    orders.value = response.data
    selectedUser.value = users.value.find((n) => n._id === userId)
    selectedUser.value.totalOrder = response.total

    // Utilisez nextTick pour garantir que le DOM est mis à jour
    nextTick(() => {
      if (panelScrollAnchor.value) {
        panelScrollAnchor.value.scrollIntoView({ behavior: 'smooth' })
      }
    })
  } catch (error) {
    console.error(error.message)
    errorMessage.value = error.message ?? 'Network error'
  }
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
