<template>
  <div v-if="order && Object.keys(order).length" class="p-4 alert alert-secondary">
    <h4 class="text-center mb-3">Détails de la commande</h4>

    <p><strong>Numéro de commande :</strong> {{ order._id }}</p>
    <p>
      <strong>Client :</strong>
      {{ order.user.name }} {{ order.user.lastName }} - {{ order.user.mail }}
    </p>
    <p><strong>Téléphone :</strong> {{ order.user.phone }}</p>
    <p>
      <strong>Livraison :</strong>
      {{ order.deliveryAddress || 'Récupération en magasin' }}
    </p>
    <p>
      <strong>Statut :</strong> <span class="text-info">{{ order.status }}</span>
    </p>
    <p><strong>Date :</strong> {{ formatDate(order.createdAt) }}</p>
    <p><strong>Total :</strong> {{ order.totalPrice }} €</p>

    <h5 class="mt-4">Produits :</h5>
    <ul class="list-group">
      <li
        v-for="(item, index) in order.products"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ item.productDetails.label }}</strong>
          <br />
          <small>{{ item.productDetails.description }}</small>
        </div>
        <div>
          {{ item.quantity }} × {{ item.productDetails.price }} € =
          {{ (item.quantity * item.productDetails.price).toFixed(2) }} €
        </div>
      </li>
    </ul>
    <ConfirmBtn
      :order="order"
      v-if="order.status === 'En cours de traitement'"
      @valid="sendEvent('valid')"
      @invalid="sendEvent('invalid')"
      @error="sendEvent('error')"
    />
  </div>
</template>

<script setup>
import ConfirmBtn from '@/components/admin/orders/ConfirmBtn.vue'

const emit = defineEmits(['valid', 'invalid', 'error'])

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})
const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
const sendEvent = (status) => {
  if (['valid', 'invalid', 'error'].includes(status)) {
    emit(status)
  } else {
    console.warn(`Événement non reconnu : ${status}`)
  }
}
</script>

<style scoped>
.list-group-item {
  background-color: #f8f9fa;
}
</style>
