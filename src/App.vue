<template>
  <Header />
  <main class="p-2 bg-secondary">
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

main {
  background-image: url('/food3.jpg');
  background-size: cover;
}

.titre {
  font-family: 'Love Light', cursive;
  text-align: center;
  margin-top: 0.5em;
  color: white;
}
</style>
