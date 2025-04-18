<template>
  <div class="d-flex gap-3 my-2">
    <button class="btn btn-outline-success" @click="valid" :disabled="isLoading">Valider</button>
    <button class="btn btn-outline-danger" @click="refuse" :disabled="isLoading">Refuser</button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const emit = defineEmits(['valid', 'invalid', 'error'])
const VivoBack = inject('VivoBack')
const errorMessage = ref(null)

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const isLoading = ref(false)

const valid = async () => {
  isLoading.value = true
  try {
    await VivoBack.updateOrder(props.order._id, { status: 'Confirmée' })
    emit('valid')
  } catch (error) {
    console.error(error)
    errorMessage.value = error.message
    emit('error')
  } finally {
    isLoading.value = false
  }
}

const refuse = async () => {
  isLoading.value = true
  try {
    await VivoBack.updateOrder(props.order._id, { status: 'Refusée' })
    emit('invalid')
  } catch (error) {
    errorMessage.value = error.message
    emit('error')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
