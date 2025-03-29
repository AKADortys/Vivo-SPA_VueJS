<template>
  <ListProducts />
  <OrderCart />
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
