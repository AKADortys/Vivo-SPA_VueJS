<template>
  <div class="d-flex flex-wrap align-items-center">
    <UserPanel />
    <UserOrdersHistoric />
  </div>
</template>
<script>
import UserPanel from '@/components/user/UserPanel.vue'
import UserOrdersHistoric from '@/components/orders/UserOrdersHistoric.vue'

export default {
  components: {
    UserPanel,
    UserOrdersHistoric,
  },
}
</script>
