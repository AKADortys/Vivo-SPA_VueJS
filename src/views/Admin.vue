<template>
  <div class="d-flex flex-column">
    <aside class="col-12">
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

    <main class="col-12 text-white">
      <section v-if="selected === 'Commandes'">
        <OrderPreview />
      </section>

      <section v-else-if="selected === 'Produits'">
        <h1>Liste des Produits</h1>
      </section>

      <section class="" v-else-if="selected === 'Utilisateurs'">
        <UsersList />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UsersList from '@/components/admin/users/UsersList.vue'
import OrderPreview from '@/components/admin/orders/OrderPreview.vue'

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

.active {
  background-color: #007bff !important;
  color: white !important;
}
</style>
