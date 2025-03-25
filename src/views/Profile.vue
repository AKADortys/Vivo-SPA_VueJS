<template>
  <div class="d-flex flex-wrap align-items-center">
    <UserPanel />
    <UserOrders />
  </div>
</template>
<script>
import UserPanel from '@/components/user/UserPanel.vue'
import UserOrders from '@/components/orders/UserOrdersHistoric.vue'

export default {
  components: {
    UserPanel,
    UserOrders,
  },
}
</script>
