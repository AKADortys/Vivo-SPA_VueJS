<template>
  <div class="d-flex flex-wrap align-items-center">
    <UserPanel />
    <UserOrdersHistoric />
    <OrderCart />
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
