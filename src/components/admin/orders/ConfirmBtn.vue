<template>
  <div class="d-flex gap-3 my-2">
    <button class="btn btn-outline-success" @click="valid" :disabled="isLoading">Valider</button>
    <button class="btn btn-outline-danger" @click="refuse" :disabled="isLoading">Refuser</button>
  </div>
  <Alert
    v-if="alertAs.show"
    :title="alertAs.title"
    :message="alertAs.message"
    :type="alertAs.type"
    :show="alertAs.show"
    @close="alertAs.show = false"
  />
</template>

<script setup>
import { ref, inject } from 'vue'
import Alert from '@/components/Alert-G.vue'

const emit = defineEmits(['button-clicked'])
const VivoBack = inject('VivoBack')

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const isLoading = ref(false)

const alertAs = ref({
  show: false,
  title: '',
  message: '',
  type: '', // ex: alert-success, alert-danger
})

const showAlert = (title, message, type = 'info') => {
  alertAs.value = {
    show: true,
    title,
    message,
    type,
  }

  setTimeout(() => {
    alertAs.value.show = false
  }, 2000)
}

const valid = async () => {
  isLoading.value = true
  try {
    await VivoBack.updateOrder(props.order._id, { status: 'Confirmée' })
    showAlert('Succès !', 'La commande est confirmé !', 'success')
    setTimeout(() => {
      emit('button-clicked')
    }, 2000)
  } catch (error) {
    console.error(error)
    showAlert('Erreur', 'La commande n’a pas pu être confirmée.', 'danger')
  } finally {
    isLoading.value = false
  }
}

const refuse = async () => {
  isLoading.value = true
  try {
    await VivoBack.updateOrder(props.order._id, { status: 'Refusée' })
    showAlert('Commande refusée', 'La commande à été refusée', 'alert-success')
    setTimeout(() => {
      emit('button-clicked')
    }, 2000)
  } catch (error) {
    console.error(error)
    showAlert('Erreur', 'La commande n’a pas pu être refusée.', 'alert-danger')
  } finally {
    isLoading.value = false
  }
}
</script>
