<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Love+Light&display=swap');

.titre {
  font-family: 'Love Light', cursive;
  text-align: center;
  margin-top: 0.5em;
  color: white;
}
body {
  min-height: 100%;
  background-image: url('/brown-wooden-textured-flooring-background.jpg');
  background-size: contain;
}
main {
  min-height: 80vh;
}
</style>
