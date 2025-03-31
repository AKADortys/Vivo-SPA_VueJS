<template>
  <h1>About</h1>
  <div
    class="d-flex align-items-center justify-content-around flex-column flex-md-row gap-1 bg-dark bg-gradient"
  >
    <Maps />
    <Networks />
  </div>
</template>
<script>
import Maps from '@/components/about/Maps.vue'
import Networks from '@/components/about/Networks.vue'

export default {
  components: {
    Maps,
    Networks,
  },
}
</script>
