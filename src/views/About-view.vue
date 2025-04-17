<template>
  <div
    class="d-flex align-items-center justify-content-around flex-column flex-md-row gap-1 bg-dark bg-gradient p-1 container rounded"
  >
    <Maps />
    <Networks />
  </div>
  <InfoEvent />
</template>
<script setup>
import Maps from '@/components/about/Maps.vue'
import Networks from '@/components/about/Networks.vue'
import InfoEvent from '@/components/about/InfoEvent.vue'
</script>
