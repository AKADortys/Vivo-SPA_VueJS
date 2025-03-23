<template>
  <UserPanel />
  <UserOrders />
</template>
<script>
import UserPanel from '@/components/user/UserPanel.vue'
import UserOrders from '@/components/user/UserOrders.vue'

export default {
  components: {
    UserPanel,
    UserOrders,
  },
}
</script>
