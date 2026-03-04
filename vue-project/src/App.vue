<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from './stores/cartStore'

import OrderHistory from './components/pages/OrderHistory.vue'
// import { useNotificationStore } from '@/stores/notificationStore'

const authStore = useAuthStore()
const cartStore = useCartStore()
// const notify = useNotificationStore()

const welcomed = ref(false)

onMounted(() => {

  authStore.restoreSession()
  

  if (authStore.isLoggedIn & !welcomed.value) {

    // notify.notify(
    //   `Welcome back ${authStore.customer.customerName}`
    // )

    alert(`Welcome back ${authStore.customer.customerName}`)

    welcomed.value = true
  }

})
</script>