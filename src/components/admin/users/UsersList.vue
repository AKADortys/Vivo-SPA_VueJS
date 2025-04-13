<template>
  <div class="p-2 my-2 bg-secondary bg-gradient col-12">
    <h1 class="titre display-2">Liste utilisateur</h1>

    <!-- filtres-->
    <div class="mb-2 p-4 d-flex gap-4 align-items-center flex-column flex-md-row bg-dark rounded">
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
    <div class="table-wrapper text-light" v-if="!isLoading">
      <div class="table-header d-flex bg-dark p-2 fw-bold">
        <div class="col">Nom</div>
        <div class="col">Email</div>
        <div class="col">Téléphone</div>
      </div>

      <div
        v-for="user in users"
        :key="user._id"
        class="d-flex p-2 border-bottom align-items-center"
      >
        <div class="col">{{ user.lastName + ' ' + user.name }}</div>
        <div class="col">{{ user.mail }}</div>
        <div class="col">{{ user.phone }}</div>
      </div>

      <div v-if="users.length === 0 && errorMessage" key="error" class="alert alert-danger w-100">
        {{ errorMessage }}
      </div>
      <div v-else-if="users.length === 0" key="empty" class="alert alert-info w-100">
        Aucun résultat
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import Loader from '@/components/Loader.vue'
const VivoBack = inject('VivoBack')

const isLoading = ref(false)
const errorMessage = ref(null)
const users = ref([])

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
  errorMessage.value = null
  page.value = 1
  isLoading.value = true
  await getUsers()
}
</script>
