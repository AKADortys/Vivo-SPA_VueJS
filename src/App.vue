<template>
  <Header />
  <main class="d-flex flex-wrap gap-2 p-2 bg-secondary">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
