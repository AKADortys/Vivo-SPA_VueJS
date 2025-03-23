<template>
  <div
    class="d-flex flex-wrap bg-dark bg-gradient rounded justify-content-center p-4 border border-warning shadow-lg"
  >
    <div v-if="connected" class="text-white justify-content-center">
      <div class="d-block mt-2">
        <p>Nom</p>
        <span>{{ user.name + ' ' + user.lastName }}</span>
      </div>
      <div class="d-block mt-2">
        <p>Email</p>
        <span>{{ user.mail }}</span>
      </div>
      <div class="d-block mt-2">
        <p>Téléphone</p>
        <span>{{ user.phone }}</span>
      </div>
      <div class="d-block mt-2">
        <p>Date D'inscription</p>
        <span>{{
          new Date(user.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}</span>
      </div>
    </div>
    <div v-else class="text-danger text-center d-flex gap-2 align-items-center">
      <p>{{ errorMessage }}</p>
      <LogPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LogPanel from '@/components/auth/LogPanel.vue'

const user = ref({})
const errorMessage = ref('')
const connected = ref(false)

onMounted(async () => {
  try {
    const data = sessionStorage.getItem('currentUser')
    if (data) {
      user.value = JSON.parse(data)
      connected.value = true
    } else {
      errorMessage.value = "Vous n'êtes pas connecté(e) !"
    }
  } catch (error) {
    errorMessage.value = error.message
  }
})
</script>

<style>
p {
  padding: 0;
  margin: 0;
}

span {
  color: goldenrod;
  font-weight: bolder;
}
</style>
