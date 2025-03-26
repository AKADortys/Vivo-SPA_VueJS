<template>
  <h3>Panier</h3>
  <div v-if="currentOrder === null">
    <p>Vous n'avez pas de commande en attente</p>
    <RouterLink to="/produits" class="btn btn-warning">Consulter nos produits</RouterLink>
  </div>
  <div v-else-if="currentOrder !== null">
    <div>
      <h4>Commande du</h4>
      <p>n° de commande</p>
      <p>Total</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix unitaire</th>
          <th>Quantité</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div>
      <button @click="clearCart">Vider le panier</button>
      <button @click="submitOrder">Valider la commande</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentOrder = ref(null)

onMounted(() => {
  const orderData = JSON.parse(sessionStorage.getItem('currentOrder'))
  if (orderData) {
    currentOrder.value = orderData
  }
})
</script>
