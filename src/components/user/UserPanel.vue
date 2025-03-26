<template>
  <div class="col-12 col-md-6 col-lg-3 d-flex flex-wrap justify-content-center">
    <div
      v-if="connected"
      class="text-white justify-content-center p-2 border border-warning shadow-lg bg-dark bg-gradient rounded"
    >
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
      <div class="d-block mt-2">
        <button class="btn btn-warning" @click="openModal">Modifier</button>
      </div>
      <Modal ref="updateUser">
        <UserUpdateForm />
      </Modal>
    </div>
    <div
      v-else
      class="text-danger text-center d-flex align-items-center justify-content-center p-2 border border-warning shadow-lg bg-dark bg-gradient rounded"
    >
      <p>{{ errorMessage }}</p>
      <LogPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LogPanel from '@/components/auth/LogPanel.vue'
import UserUpdateForm from '@/components/user/UserUpdateForm.vue'
import Modal from '@/components/Modal.vue'

const user = ref({})
const errorMessage = ref('')
const connected = ref(false)
const updateUser = ref(null)

const openModal = () => updateUser.value?.openModal()

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
