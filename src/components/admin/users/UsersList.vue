<template>
  <!--Chargement-->
  <Loader v-if="isLoading" />

  <!--Erreur server-->
  <p class="alert alert-danger text-center" v-else-if="errorMessage">
    {{ errorMessage }}
  </p>

  <!--tableau vide-->
  <div class="bg-dark bg-gradient border border-warning rounded" v-else-if="!users.length">
    <p class="alert alert-info text-center">Aucuns Utilisateurs</p>
  </div>

  <!-- filtres-->
  <div class="p-2 my-2 bg-secondary bg-gradient col-12" v-else>
    <h1 class="titre display-2">Liste utilisateur</h1>
    <div class="mb-2 p-4 d-flex gap-4 align-items-center flex-column flex-md-row bg-dark rounded">
      <div class="d-flex gap-4">
        <input
          v-model="searchVal"
          placeholder="Nom, Prénom, Email, Tel."
          class="form-control"
          type="text"
        />
        <select title="Limite d'utilisateurs" v-model="searchLmt">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="d-flex gap-4">
        <button title="Recherche" class="btn btn-outline-warning" @click="filter">🔎</button>
        <button title="Annuler filtre" class="btn btn-outline-danger" @click="reset">❌</button>
      </div>
      <p class="text-center">
        Total utilisateur(s) <span class="text-warning">{{ total }}</span>
      </p>
    </div>

    <!--Table-->
    <table class="table table-striped table-dark table-hover text-center overflow-auto w-100">
      <thead>
        <tr>
          <td class="text-warning">Nom</td>
          <td class="text-warning">Email</td>
          <td class="text-warning">Téléphone</td>
        </tr>
      </thead>
      <tbody>
        <!--si le tableau à filtre est vide-->
        <tr v-if="users.length && !filteredUsers.length" v-for="user in users" :key="user._id">
          <td>{{ user.lastName + ' ' + user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.phone }}</td>
        </tr>
        <!--si le tableau à filtre est remplis-->
        <tr v-else v-for="user in filteredUsers">
          <td>{{ user.lastName }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <!--boutton pour charger plus de resultats-->
    <button
      v-if="page < totalPage && !isLoading"
      class="btn btn-outline-warning d-block mx-auto mt-3"
      @click="loadMore"
    >
      Charger {{ searchLmt }} plus
      <br />
      Page {{ page }} sur {{ totalPage }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import Loader from '@/components/Loader.vue'

const isLoading = ref(false)
const errorMessage = ref(null)
const users = ref([])
const searchLmt = ref(10)
const page = ref(1)
const totalPage = ref(0)
const total = ref(0)
const searchVal = ref('')
const filteredUsers = ref([])
const VivoBack = inject('VivoBack')

watch(searchLmt, async () => {
  users.value = []
  page.value = 1
  isLoading.value = true
  await getUsers()
})

onMounted(async () => {
  isLoading.value = true
  await getUsers()
})
const getUsers = async () => {
  try {
    const response = await VivoBack.getUsers(page.value, searchLmt.value)
    const data = Array.isArray(response.data) ? response.data : []
    users.value.push(...data)
    isLoading.value = false
    page.value = response.page
    totalPage.value = response.totalPages
    total.value = response.total
  } catch (error) {
    isLoading.value = false
    errorMessage.value = error
  }
}
const loadMore = async () => {
  page.value++
  getUsers()
}

const reset = () => {
  filteredUsers.value = []
  searchVal.value = ''
}

const filter = () => {
  try {
    filteredUsers.value = users.value.filter((item) => {
      const search = searchVal.value.toLowerCase()
      return (
        item.name.toLowerCase().includes(search) ||
        item.lastName.toLowerCase().includes(search) ||
        item.phone.toLowerCase().includes(search) ||
        item.mail.toLowerCase().includes(search)
      )
    })
  } catch (error) {
    errorMessage.value = error
    console.error(error)
  }
}
</script>
