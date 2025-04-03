<template>
  <h1 class="display-1 mb-4 titre">Tableau de bord</h1>
  <div class="container">
    <div class="row align-items-center flex-column justify-content-around flex-md-row my-4">
      <UserPanel />
      <OrderCart />
      <UserOrdersHistoric />
    </div>
  </div>
</template>
<script>
import UserPanel from '@/components/user/UserPanel.vue'
import UserOrdersHistoric from '@/components/orders/UserOrdersHistoric.vue'
import OrderCart from '@/components/orders/OrderCart.vue'

export default {
  components: {
    UserPanel,
    UserOrdersHistoric,
    OrderCart,
  },
}
</script>
