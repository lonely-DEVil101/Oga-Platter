import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from './cartStore'
import { useOrderStore } from '@/stores/orderStore'

export const useAuthStore = defineStore('auth', () => {

  // -------------------------
  // STATE
  // -------------------------
  const customer = ref(null)
  const token = ref(null) // JWT token

  // -------------------------
  // GETTERS
  // -------------------------
  const isLoggedIn = computed(() => !!customer.value && !!token.value)

  // -------------------------
  // RESTORE SESSION (on app start)
  // -------------------------
  function restoreSession() {
    const savedCustomer = localStorage.getItem('customer')
    const savedToken = localStorage.getItem('token')

    if (savedCustomer && savedToken) {
      customer.value = JSON.parse(savedCustomer)
      token.value = savedToken

      // Load user's cart and orders AFTER restoring session
      const cartStore = useCartStore()
      const orderStore = useOrderStore()
      console.log(orderStore)
      cartStore.loadCart()
      orderStore.loadOrders()
    }
  }

  // -------------------------
  // LOGIN
  // -------------------------
  async function login(customerData) {
    customer.value = customerData
    token.value = customerData.token

    // persist to localStorage
    localStorage.setItem('customer', JSON.stringify(customerData))
    console.log('customer data')
    console.log(customerData)
    console.log(token)
    localStorage.setItem('token', token.value)

    // load user's cart and orders
    const cartStore = useCartStore()
    const orderStore = useOrderStore()
    cartStore.loadCart()
    orderStore.loadOrders()
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  function logout() {
    const cartStore = useCartStore()
    const orderStore = useOrderStore()

    cartStore.clearCart()        // clears current user's cart
               // clear local orders (optional)
    customer.value = null
    token.value = null

    localStorage.removeItem('customer')
    localStorage.removeItem('token')
  }

  return {
    customer,
    token,
    isLoggedIn,
    login,
    logout,
    restoreSession
  }
})