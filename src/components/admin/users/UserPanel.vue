<template>
  <h1>panel</h1>
  {{ user.user.name }}
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>
