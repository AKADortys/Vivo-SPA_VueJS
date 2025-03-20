<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content w-100 w-md-50">
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
  position: relative;
  display: flex;
  margin: auto;
}

.btn-closeModal {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
