<template>
  <div class="d-flex justify-content-center">
    <!-- Boutons Auth (Login/Signup) -->
    <div v-if="!connected" class="d-flex flex-wrap flex-md-nowrap gap-2">
      <button type="button" class="btn btn-outline-warning me-2" @click="openLoginModal">
        Se connecter
      </button>
      <button type="button" class="btn btn-warning" @click="openRegisterModal">S'inscrire</button>
    </div>

    <!-- Bouton de Déconnexion -->
    <div v-else class="d-flex gap-2 align-items-center">
      <RouterLink to="/dashboard">
        <button type="button" class="btn btn-primary">Mon profil</button>
      </RouterLink>
      <button type="button" class="btn btn-danger" @click="logout">Se déconnecter</button>
    </div>
  </div>

  <!-- Modals -->
  <Modal ref="registerModal">
    <RegisterForm />
  </Modal>

  <Modal ref="loginModal">
    <LoginForm />
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useUserStore } from '@/store/userStore'

// Récupération du store User
const userStore = useUserStore()

// Références des modals
const registerModal = ref(null)
const loginModal = ref(null)
const connected = ref(false)
const currentUser = ref({})
const router = useRouter()

onMounted(async () => {
  await userStore.chargerUtilisateur()
  if (userStore.utilisateur !== null) {
    connected.value = true
    currentUser.value = userStore.utilisateur
  }
})

// Ouvrir la modal d'inscription
const openRegisterModal = () => registerModal.value?.openModal()

// Ouvrir la modal de connexion
const openLoginModal = () => loginModal.value?.openModal()

// Méthode de déconnexion
const logout = async () => {
  try {
    await userStore.logout()
    connected.value = false
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
