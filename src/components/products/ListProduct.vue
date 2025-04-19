<template>
  <!-- Affichage de l'accordéon uniquement si produits disponibles ET chargement terminé -->
  <div v-if="!isLoading && products.length" class="accordion w-100" id="categoryAccordion">
    <div v-for="(cat, index) in category" :key="cat" class="accordion-item bg-dark text-white">
      <!-- Titre de la catégorie -->
      <h2 class="accordion-header">
        <button
          class="accordion-button text-warning bg-dark"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse-' + cat.replace(/\s+/g, '')"
          :aria-expanded="index === 0 ? 'true' : 'false'"
          :aria-controls="'collapse-' + cat.replace(/\s+/g, '')"
        >
          {{ cat }}
        </button>
      </h2>

      <!-- Contenu de la catégorie -->
      <div
        :id="'collapse-' + cat.replace(/\s+/g, '')"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        data-bs-parent="#categoryAccordion"
      >
        <div class="accordion-body">
          <!-- Produits disponibles -->
          <div
            v-if="filteredProducts[cat] && filteredProducts[cat].length"
            class="d-flex flex-wrap gap-2 justify-content-center"
          >
            <div
              v-for="product in filteredProducts[cat]"
              :key="product._id"
              class="card bg-secondary bg-gradient p-2 col-12 col-md-5 text-center pe-auto user-select-none product-card"
              @click="addToCart(product)"
            >
              <h3 class="text-white display-6">{{ product.label }}</h3>
              <p class="text-warning mb-2">{{ product.description }}</p>
              <p class="text-info mb-2">Prix : {{ product.price }} €</p>
            </div>
          </div>

          <!-- Aucun produit -->
          <p v-else-if="!errorMessage" class="text-center text-warning">
            Aucun produit disponible.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Affichage du loader -->
  <Loader v-else-if="isLoading" />
  <!-- Erreur de chargement -->
  <p v-else-if="errorMessage" class="text-danger text-center w-100 alert alert-danger">
    {{ errorMessage }}
  </p>

  <!-- Fallback : aucun produit et pas en chargement -->
  <p v-else class="text-center text-warning mt-4">Aucun produit trouvé pour le moment.</p>

  <AlertG
    v-if="alertAs.show"
    :title="alertAs.title"
    :message="alertAs.message"
    :type="alertAs.type"
    :show="alertAs.show"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePanierStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import Loader from '@/components/Loader.vue'
import AlertG from '@/components/Alert-G.vue'

const panierStore = usePanierStore()
const userStore = useUserStore()
const isLoading = ref(false)
const errorMessage = ref(null)
const products = ref([])
const category = ref(['Plat principal', 'Dessert', 'Boisson', 'Divers'])
const alertAs = ref({
  show: false,
  title: '',
  message: ' ajouté avec succés !',
  type: 'success', // ex: alert-success, alert-danger
})

onMounted(async () => {
  try {
    isLoading.value = true
    await panierStore.getProduct()
    await userStore.chargerUtilisateur()
    products.value = panierStore.products
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error)
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
})

const filteredProducts = computed(() => {
  const grouped = {}
  category.value.forEach((cat) => {
    grouped[cat] = products.value.filter((p) => p.category === cat && p.available)
  })
  return grouped
})

const addToCart = (product) => {
  if (!userStore.utilisateur) {
    alertAs.value = {
      show: true,
      title: '',
      message: 'Connectez vous pour ajouter un produit',
      type: 'danger', // ex: alert-success, alert-danger
    }
    setTimeout(() => {
      alertAs.value.show = false
    }, 1500)
    return
  }
  alertAs.value.title = `${product.label}`
  const formatProduct = {
    id: product.id,
    label: product.label,
    price: product.price,
    quantity: 1,
  }
  panierStore.ajouterProduit(formatProduct)
  alertAs.value = {
    show: true,
    title: product.label,
    message: ' ajouté avec succés !',
    type: 'success', // ex: alert-success, alert-danger
  }
  setTimeout(() => {
    alertAs.value.show = false
  }, 1500)
}
</script>

<style>
.product-card {
  cursor: pointer;
  transition:
    border 0.15s ease,
    transform 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  border: gold solid 0.1em;
  transform: scale(1.1);
  z-index: 1;
}
</style>
