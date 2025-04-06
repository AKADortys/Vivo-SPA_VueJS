<template>
  <div class="d-flex flex-column flex-md-row">
    <aside class="col-12 col-md-4">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item"
          :class="[
            'text-primary',
            'text-center',
            'p-4',
            'bg-secondary',
            'my-1',
            selected === item ? 'active' : '',
          ]"
          @click="selected = item"
        >
          {{ item }}
        </li>
      </ul>
    </aside>

    <main class="col-12 col-md-8 text-white p-0">
      <section class="container" v-if="selected === 'Commandes'">
        <h1>Liste des Commandes</h1>
      </section>

      <section class="container" v-else-if="selected === 'Produits'">
        <h1>Liste des Produits</h1>
      </section>

      <section class="container" v-else-if="selected === 'Utilisateurs'">
        <h1>Liste des Utilisateurs</h1>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ['Commandes', 'Produits', 'Utilisateurs']
const selected = ref('Commandes') // valeur par déf
</script>

<style scoped>
aside > ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: black;
}

aside > ul > li {
  transition:
    transform 0.2s ease-in,
    background-color 0.5s ease-in-out;
  cursor: pointer;
}

aside > ul > li:hover {
  transform: scale(1.1);
}

.active {
  background-color: #007bff !important;
  color: white !important;
}
</style>
