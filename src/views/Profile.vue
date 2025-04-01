<template>
  <h1 class="display-1 mb-4 titre">Tableau de bord</h1>
  <div class="d-flex flex-wrap align-items-center justify-content-center gap-2 container">
    <UserPanel />
    <OrderCart />
    <UserOrdersHistoric />
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
