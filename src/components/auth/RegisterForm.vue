<script setup>
import { ref, inject } from 'vue'
import { z } from 'zod'

const VivoBack = inject('VivoBack')

// Définition du schéma de validation avec Zod
const schema = z
  .object({
    nom: z.string().min(1, 'Le nom est requis.'),
    prenom: z.string().min(1, 'Le prénom est requis.'),
    email: z.string().email('Email invalide.'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
    confirmPassword: z.string(),
    telephone: z
      .string()
      .regex(/^((\+33|0)[1-9])(\d{8})$/, 'Numéro invalide (ex: 06XXXXXXXX ou +336XXXXXXXX).'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  })

// Références réactives
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  confirmPassword: '',
  telephone: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  const result = schema.safeParse(form.value)

  if (result.success) {
    const user = {
      name: form.value.prenom,
      lastName: form.value.nom,
      mail: form.value.email,
      password: form.value.password,
      phone: form.value.telephone,
    }
    // Appel du service VivoBack pour inscription
    VivoBack.register(user)
      .then((response) => {
        // Afficher un message de confirmation
        alert('Inscription réussie!')
        // Reinitialiser le formulaire
        form.value = {}
      })
      .catch((error) => {
        console.error(error)
        // Afficher un message d'erreur
      })
  } else {
    result.error.errors.forEach((error) => {
      errors.value[error.path[0]] = error.message
    })
  }
}
</script>

<template>
  <!-- Formulaire d'inscription -->
  <form
    @submit.prevent="validateForm"
    class="px-3 py-2 bg-dark bg-gradient bg-opacity-75 text-white d-flex flex-wrap gap-3 rounded border border-dark justify-content-center"
  >
    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Nom :</label>
      <input v-model="form.nom" type="text" class="form-control" />
      <span v-if="errors.nom" class="text-danger">{{ errors.nom }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Prénom :</label>
      <input v-model="form.prenom" type="text" class="form-control" />
      <span v-if="errors.prenom" class="text-danger">{{ errors.prenom }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Email :</label>
      <input v-model="form.email" type="email" class="form-control" />
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Mot de passe :</label>
      <input v-model="form.password" type="password" class="form-control" />
      <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Confirmation du mot de passe :</label>
      <input v-model="form.confirmPassword" type="password" class="form-control" />
      <span v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</span>
    </div>

    <div
      class="mb-1 d-flex flex-wrap flex-column col-10 col-md-5 border-bottom border-warning py-1"
    >
      <label class="mb-1">Téléphone :</label>
      <input v-model="form.telephone" type="tel" class="form-control" />
      <span v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</span>
    </div>

    <div class="d-flex col-12 justify-content-center gap-3 mt-1">
      <button class="btn btn-warning" type="submit">S'inscrire</button>
      <button class="btn btn-danger" type="reset">Réinitialiser</button>
    </div>
  </form>
</template>
