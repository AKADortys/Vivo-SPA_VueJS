<template>
  <header class="bg-dark border-bottom p-2">
    <div class="d-flex flex-wrap align-items-center justify-content-between">
      <!-- Logo -->
      <RouterLink to="/" class="d-flex align-items-center text-white text-decoration-none">
        <img src="/fondecran.png" alt="Logo" class="logo" />
        <span class="fs-4 text-warning titre">Au P'tit Vivo</span>
      </RouterLink>
      <!-- Menu de navigation -->
      <div class="d-flex justify-content-center">
        <ul class="nav">
          <li>
            <RouterLink to="/" class="nav-link px-2 text-white" active-class="active text-light">
              Accueil
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/produits"
              class="nav-link px-2 text-white"
              active-class="active text-light"
            >
              Produits
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="nav-link px-2 text-white"
              active-class="active text-light"
            >
              Informations
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Auth Menu -->
      <AuthMenu />
    </div>
  </header>
</template>

<script setup>
import AuthMenu from '@/components/auth/LogPanel.vue'
</script>

<style scoped>
.active {
  font-weight: bold;
  text-decoration: underline gold;
}

.logo {
  height: 4em;
  margin: 0 1em;
}
</style>
