<template>
  <div class="d-flex gap-3 my-2">
    <button class="btn btn-outline-success" @click="valid" :disabled="isLoading">Valider</button>
    <button class="btn btn-outline-danger" @click="refuse" :disabled="isLoading">Refuser</button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const emit = defineEmits(['button-clicked'])

const isLoading = ref(false)
const errorMessage = ref('')
const VivoBack = inject('VivoBack')
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const valid = async () => {
  try {
    const response = await VivoBack.updateOrder(props.order._id, { status: 'Confirmée' })
    emit('button-clicked')
  } catch (error) {
    errorMessage.value = error
    console.error(error)
  }
}

const refuse = async () => {
  try {
    const response = await VivoBack.updateOrder(props.order._id, { status: 'Refusée' })
    emit('button-clicked')
  } catch (error) {
    errorMessage.value = error
    console.error(error)
  }
}
</script>
