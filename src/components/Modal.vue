<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button @click="closeModal" class="btn btn-danger btn-closeModal">X</button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
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

defineExpose({
  openModal,
  closeModal,
})
</script>

<style scoped>
/* Ajout de l'animation fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Styles de la modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0.2em;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.2em;
}

.modal-content {
  position: absolute;
  width: 80%;
  top: 5%;
  left: auto;
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
}

.btn-closeModal {
  position: absolute;
  top: 1.2em;
  right: 1.2em;
}
</style>
