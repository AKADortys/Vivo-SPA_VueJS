<script setup>
import { ref, inject } from 'vue'
import { z } from 'zod'

const VivoBack = inject('VivoBack')
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

// Schéma de validation
const schema = z.object({
  nom: z.string().min(1, 'Le nom est requis.'),
  prenom: z.string().min(1, 'Le prénom est requis.'),
  email: z.string().email('Email invalide.'),
  telephone: z
    .string()
    .regex(/^((\+33|0)[1-9])(\d{8})$/, 'Numéro invalide (ex: 06XXXXXXXX ou +336XXXXXXXX).'),
})

// Remplissage des champs avec les données actuelles
const form = ref({
  nom: currentUser?.lastName || '',
  prenom: currentUser?.name || '',
  email: currentUser?.mail || '',
  telephone: currentUser?.phone || '',
})

const errors = ref({})

const updateUser = () => {
  errors.value = {}
  const result = schema.safeParse(form.value)

  if (result.success) {
    const updatedUser = {
      name: form.value.prenom,
      lastName: form.value.nom,
      mail: form.value.email,
      phone: form.value.telephone,
    }

    VivoBack.updateUser(currentUser._id, updatedUser)
      .then((response) => {
        alert('Mise à jour réussie !')
        sessionStorage.setItem('currentUser', JSON.stringify(response.user))
        location.reload()
      })
      .catch((error) => {
        console.error(error)
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
    @submit.prevent="updateUser"
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
      <label class="mb-1">Téléphone :</label>
      <input v-model="form.telephone" type="tel" class="form-control" />
      <span v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</span>
    </div>

    <div class="d-flex col-12 justify-content-center gap-3 mt-1">
      <button class="btn btn-warning" type="submit">Mettre à jour</button>
      <button class="btn btn-danger" type="reset">Réinitialiser</button>
    </div>
  </form>
</template>
