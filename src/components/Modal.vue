<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="btn btn-danger btn-closeModal">X</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

// Exposez les méthodes pour ouvrir et fermer la modal
defineExpose({
  openModal,
  closeModal,
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: auto;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 95%;
  margin: 0.5em auto;
}

.btn-closeModal {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
</style>
