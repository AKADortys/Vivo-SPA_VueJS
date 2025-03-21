<template>
  <header class="bg-dark border-bottom p-2">
    <div class="container d-flex flex-wrap align-items-center justify-content-between gap-3">
      <!-- Logo -->
      <RouterLink to="/" class="d-flex align-items-center text-white text-decoration-none">
        <img src="/fondecran.png" alt="Logo" class="logo" />
        <span class="fs-4 text-warning">Au P'tit Vivo</span>
      </RouterLink>

      <div class="d-flex gap-3">
        <!-- Menu de navigation -->
        <div class="w-md-50 d-md-flex justify-content-center">
          <ul class="nav">
            <li>
              <RouterLink to="/" class="nav-link px-2 text-white" active-class="active text-light">
                Accueil
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="nav-link px-2 text-white"
                active-class="active text-light"
              >
                Informations
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/contact"
                class="nav-link px-2 text-white"
                active-class="active text-light"
              >
                Contact
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/produits"
                class="nav-link px-2 text-white"
                active-class="active text-light"
              >
                Produits
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- Boutons Auth (Login/Signup) -->
        <div class="d-md-flex d-none" v-if="!connected">
          <button type="button" class="btn btn-outline-warning me-2" @click="openLoginModal">
            Se connecter
          </button>
          <button type="button" class="btn btn-warning" @click="openRegisterModal">
            S'inscrire
          </button>
        </div>

        <!-- Bouton de Déconnexion -->
        <div class="d-md-flex d-none align-items-center" v-if="connected">
          <button type="button" class="btn btn-danger" @click="logout">Se déconnecter</button>
          <span class="mx-3 text-primary">
            {{ currentUser.mail }}
          </span>
        </div>
      </div>
    </div>
  </header>

  <!-- Modals -->
  <Modal ref="registerModal">
    <RegisterForm />
  </Modal>

  <Modal ref="loginModal">
    <LoginForm />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import VivoBack from '@/services/VivoBack.js'

// Références des modals
const registerModal = ref(null)
const loginModal = ref(null)
const connected = ref(false)
const currentUser = ref({})

const data = JSON.parse(sessionStorage.getItem('currentUser'))

if (data) {
  connected.value = true
  currentUser.value = data
}

// Ouvrir la modal d'inscription
const openRegisterModal = () => {
  if (registerModal.value) {
    registerModal.value.openModal()
  }
}

// Ouvrir la modal de connexion
const openLoginModal = () => {
  if (loginModal.value) {
    loginModal.value.openModal()
  }
}

// Méthode de déconnexion
const logout = async () => {
  try {
    await VivoBack.logout()
    connected.value = null
    sessionStorage.clear()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.active {
  font-weight: bold;
  text-decoration: underline gold;
}

.logo {
  height: 4em;
  margin: 0 1em;
}
</style>
