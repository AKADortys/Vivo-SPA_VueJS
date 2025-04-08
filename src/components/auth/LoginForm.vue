<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { useUserStore } from '@/store/userStore'

const emit = defineEmits(['user-auth'])

// Récupération du store User
const userStore = useUserStore()

// Définition du schéma de validation avec Zod
const schema = z.object({
  email: z.string().email('Email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
})

// Références réactives
const form = ref({
  email: '',
  password: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  const result = schema.safeParse(form.value)

  if (result.success) {
    const user = {
      email: form.value.email,
      password: form.value.password,
    }

    // Appel du service VivoBack pour la connexion
    userStore
      .authenticate(user)
      .then((response) => {
        if (!response) {
          console.error('Authentication failed')
          errors.value.general = "L'authentication a échoué, vérifiez vos informations "
          return
        }
        form.value = {}
        //prévoir alert SweetAlert
        emit('user-auth')
      })
      .catch((error) => {
        console.error(error)
        errors.value.general = 'Échec de la connexion, veuillez vérifier vos identifiants.'
      })
  } else {
    result.error.errors.forEach((error) => {
      errors.value[error.path[0]] = error.message
    })
  }
}
</script>

<template>
  <form
    @submit.prevent="validateForm"
    class="px-3 py-2 bg-dark bg-gradient bg-opacity-75 text-white d-flex flex-wrap gap-3 rounded border border-dark justify-content-center"
  >
    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-8 border-bottom border-warning py-1"
    >
      <label class="mb-1">Email :</label>
      <input v-model="form.email" type="email" class="form-control" />
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-8 border-bottom border-warning py-1"
    >
      <label class="mb-1">Mot de passe :</label>
      <input v-model="form.password" type="password" class="form-control" />
      <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
    </div>

    <span v-if="errors.general" class="text-danger">{{ errors.general }}</span>

    <div class="d-flex gap-3 col-10 justify-content-center mt-1">
      <button class="btn btn-warning" type="submit">Se connecter</button>
      <button class="btn btn-danger" type="reset">Réinitialiser</button>
    </div>
  </form>
</template>
