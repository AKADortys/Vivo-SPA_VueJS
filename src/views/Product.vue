<template>
  <h1 class="display-1 mb-4 titre">Nos produits</h1>
  <div class="p-4 d-flex flex-wrap justify-content-center container">
    <ListProducts />
    <OrderCart />
  </div>
</template>

<script>
import ListProducts from '@/components/products/ListProduct.vue'
import OrderCart from '@/components/orders/OrderCart.vue'

export default {
  components: {
    ListProducts,
    OrderCart,
  },
}
</script>
