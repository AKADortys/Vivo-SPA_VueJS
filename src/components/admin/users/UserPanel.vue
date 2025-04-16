<template>
  <div
    v-if="u && u._id"
    class="alert alert-dark p-4 d-flex flex-column flex-md-row justify-content-around align-items-center"
  >
    <div class="alert alert-info p-2 col-12 col-md-4">
      <h2>Détails de l'utilisateur</h2>
      <p>
        Nom: <span>{{ u.name }}</span>
      </p>
      <p>
        Prénom: <span>{{ u.lastName }}</span>
      </p>
      <p>
        Téléphone: <span>{{ u.phone }}</span>
      </p>
      <p>
        Email: <span>{{ u.mail }}</span>
      </p>
      <p>
        inscription: <span>{{ formatDate(u.createdAt) }}</span>
      </p>
      <p>
        Commandes passée: <span>{{ u.totalOrder }} </span>
      </p>
    </div>
    <div v-if="orders && orders.length" class="col-12 col-md-6 orderDiv">
      <h2 class="text-center">Commandes récentes</h2>
      <section v-for="order in orders" :key="order._id" class="alert alert-primary">
        <h4 class="text-primary text-center">Commande du {{ formatDate(order.createdAt) }}</h4>
        <p class="text-center mb-2">
          Livraison
          <span>{{ order.deliveryAddress ? order.deliveryAddress : 'Aucunes' }}</span>
        </p>
        <p class="text-center mb-2">
          Statut <span>{{ order.status }}</span>
        </p>
        <p class="text-center mb-2">
          N° commande <span>{{ order._id }}</span>
        </p>
        <div class="d-flex flex-wrap align-items-center justify-content-center mb-3 py-2">
          <div class="d-flex gap-4">
            <p class="text-center">
              Total <span>{{ order.totalPrice }} €</span>
            </p>
            <RouterLink :to="`/order/${order._id}`">
              <button class="btn btn-primary">Voir détails</button>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>

    <p v-else>Aucune commande trouvée.</p>
  </div>
  <div v-else>
    <p class="alert alert-info p-4 text-center">Aucun utilisateur sélectionné.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  u: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  orders: {
    type: Array,
    required: true,
    default: () => [],
  },
})
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.orderDiv {
  max-height: 300px;
  overflow: auto;
}
</style>
