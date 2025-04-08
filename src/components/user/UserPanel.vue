<template>
  <div
    v-if="connected"
    class="text-white p-2 border shadow-lg bg-dark bg-gradient rounded col-12 col-md-6 col-lg-3"
  >
    <h4 class="text-center display-6">Mes informations</h4>
    <div class="text-center mt-2">
      <p>Nom</p>
      <span>{{ user.name + ' ' + user.lastName }}</span>
    </div>
    <div class="text-center mt-2">
      <p>Email</p>
      <span>{{ user.mail }}</span>
    </div>
    <div class="text-center mt-2">
      <p>Téléphone</p>
      <span>{{ user.phone }}</span>
    </div>
    <div class="text-center mt-2">
      <p>Date D'inscription</p>
      <span>{{
        new Date(user.createdAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}</span>
    </div>
    <div class="text-center mt-2">
      <button class="btn btn-warning" @click="openModal">Modifier</button>
    </div>
    <Modal ref="updateUserModal">
      <UserUpdateForm @user-updated="refresh" />
    </Modal>
  </div>
  <div
    v-else
    class="text-danger text-center d-flex align-items-center justify-content-center p-2 border border-warning shadow-lg bg-dark bg-gradient rounded"
  >
    <p>{{ errorMessage }}</p>
    <LogPanel />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LogPanel from '@/components/auth/LogPanel.vue'
import UserUpdateForm from '@/components/user/UserUpdateForm.vue'
import Modal from '@/components/Modal.vue'
import { useUserStore } from '@/store/userStore'

// Récupération du store User
const userStore = useUserStore()
const user = ref(null)
const errorMessage = ref('')
const connected = ref(false)
const updateUserModal = ref(null)

const openModal = () => updateUserModal.value?.openModal()

onMounted(async () => {
  try {
    await userStore.chargerUtilisateur()
    if (userStore.utilisateur) {
      user.value = userStore.utilisateur
      connected.value = true
    } else {
      errorMessage.value = "Vous n'êtes pas connecté(e) !"
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue : ' + error.message
  }
})

const refresh = async () => {
  await userStore.chargerUtilisateur()
  user.value = userStore.utilisateur
  updateUserModal.value?.closeModal()
}
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
