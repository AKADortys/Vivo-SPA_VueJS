<script setup>
import { ref, onMounted } from 'vue'
import { usePanierStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import infoOrder from '@/components/about/infoOrder.vue'
import Alert from '@/components/Alert-G.vue'

const userStore = useUserStore()
const panierStore = usePanierStore()
const address = ref(null)
const alertAs = ref({
  show: false,
  title: '',
  message: '',
  type: 'danger', // ex: alert-success, alert-danger
})

// Charger le panier depuis Dexie au montage du composant
onMounted(async () => {
  await panierStore.chargerPanier()
  await userStore.chargerUtilisateur()
})

const supprimerProduit = (id) => {
  alertAs.value.show = false
  panierStore.supprimerProduit(id)
  alertAs.value = {
    show: true,
    title: 'Article supprimé',
    message: '',
    type: 'danger', // ex: alert-success, alert-danger
  }
  setTimeout(() => {
    alertAs.value.show = false
  }, 1500)
}

const viderPanier = () => {
  alertAs.value.show = false
  panierStore.viderPanier()
  alertAs.value = {
    show: true,
    title: 'Panier vidé',
    message: '',
    type: 'danger', // ex: alert-success, alert-danger
  }
  setTimeout(() => {
    alertAs.value.show = false
  }, 1500)
}

const confirm = () => {
  panierStore.confirmOrder(userStore.utilisateur.id, address.value ? address.value : null)
}
</script>

<template>
  <div v-if="!userStore.utilisateur" class="bg-dark bg-gradient p-4 my-4 rounded border">
    <p class="text-danger text-center my-4">Vous n'êtes pas connecté(e) !</p>
    <p class="text-warning text-center my-4">
      Pour passer commande, connectez vous ou créez un compte
    </p>
  </div>
  <div class="col-12 col-md-10 col-lg-8" v-else-if="!panierStore.orderProduct.length">
    <h1 class="text-center display-1 titre my-4">Mon panier</h1>
    <table class="my-4 p-2 table-dark table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="text-center p-4">Aucun produit dans le panier</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="col-12 col-md-10 col-lg-8" v-else>
    <h2 class="text-center display-5 titre">Mon panier</h2>

    <table class="my-2 p-2 table-dark table table-striped table-hover text-center">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produit in panierStore.orderProduct" :key="produit.id">
          <td class="text-warning">{{ produit.label }}</td>
          <td class="text-primary">{{ produit.price }}€</td>
          <td class="text-primary">
            {{ produit.quantity }}
          </td>
          <td>
            <button class="btn" @click="supprimerProduit(produit.id)">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
    <infoOrder />
    <p
      class="text-warning border border-warning rounded text-center mb-2 display-6 bg-dark bg-gradient p-2"
    >
      Total de la commande : <span class="text-primary">{{ panierStore.total }}€</span>
    </p>
    <p class="d-flex gap-3 justify-content-center p-2">
      <label for="address" class="text-white">Addresse de livraison</label>
      <input v-model="address" id="address" name="address" type="text" />
    </p>
    <div class="d-flex justify-content-center gap-3 mb-4">
      <button class="btn btn-danger" @click="viderPanier()">Vider le panier</button>
      <button class="btn btn-success" @click="confirm()">Confirmer la commande</button>
    </div>
  </div>
  <Alert
    v-if="alertAs.show"
    :title="alertAs.title"
    :message="alertAs.message"
    :type="alertAs.type"
    :show="alertAs.show"
  />
</template>
