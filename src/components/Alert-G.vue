<template>
  <div v-if="show" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
    <div
      class="toast show align-items-center text-white border-0"
      :class="toastType"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <strong v-if="title">{{ title }} </strong> {{ message ? message : '' }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (val) =>
      ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark'].includes(val),
  },
  show: Boolean,
})

const toastType = computed(() => `bg-${props.type}`)
</script>
