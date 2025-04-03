<template>
  <Header />
  <main>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Love+Light&display=swap');

.titre {
  font-family: 'Love Light', cursive;
  text-align: center;
  margin-top: 0.5em;
}
main {
  min-height: 100%;
}
</style>
