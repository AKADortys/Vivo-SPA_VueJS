<template>
  <Loader v-if="isLoading" />
  <p class="alert alert-danger text-center" v-else-if="errorMessage">
    {{ errorMessage }}
  </p>
  <div class="bg-dark bg-gradient border border-warning rounded" v-else-if="!users.length">
    <p class="alert alert-info text-center">Aucuns Utilisateurs</p>
  </div>
  <div class="p-2 my-2 bg-secondary bg-gradient" v-else>
    <h1 class="titre display-2">Liste utilisateur</h1>
    <p class="text-center mb-4">
      Nombres d'utilisateur <span class="text-warning">{{ total }}</span>
    </p>
    <table class="table table-striped table-dark table-hover text-center">
      <thead>
        <th scope="col" class="text-warning">Nom</th>
        <th scope="col" class="text-warning">Prénom</th>
        <th scope="col" class="text-warning">Email</th>
        <th scope="col" class="text-warning">Téléphone</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.lastName }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <button
      v-if="page < totalPage && !isLoading"
      class="btn btn-outline-warning d-block mx-auto mt-3"
      @click="loadMore"
    >
      Charger plus
      <br />
      Page {{ page }} sur {{ totalPage }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import Loader from '@/components/Loader.vue'

const isLoading = ref(false)
const errorMessage = ref(null)
const users = ref([])
const page = ref(1)
const totalPage = ref(0)
const total = ref(0)

const VivoBack = inject('VivoBack')

onMounted(async () => {
  isLoading.value = true
  await getUsers()
})
const getUsers = async () => {
  try {
    const response = await VivoBack.getUsers(page.value)
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
</script>
