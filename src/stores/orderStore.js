import { defineStore } from 'pinia'
import { ref } from 'vue'
import { placeOrder, getMyOrders } from '@/services/orderService'

export const useOrderStore = defineStore('order',  () => {

  // =========================
  // STATE
  // =========================
  const orders = ref([])
  const loading = ref(false)

  // =========================
  // LOAD ORDERS FROM BACKEND
  // =========================
  const loadOrders = async () => {
    loading.value = true
    console.log("up")

    try {
      const response = await getMyOrders()
      orders.value = response
      console.log(orders)
      console.log(response)

      // Normalize backend response → UI format
      

    } catch (error) {
      console.error('Failed to load orders:', error)
      orders.value = []
    } finally {
      loading.value = false
    }
  }

  // =========================
  // CREATE ORDER
  // =========================
  const createOrder = async (cartItems) => {
    loading.value = true

    try {
      // Backend accepts ONE item per request
      console.log("created items")
      console.log("cartItems", cartItems);
      const orderResponse = await placeOrder(cartItems);
      console.log(orderResponse)


      // Add newest order on top
      orders.value.unshift(orderResponse)
      console.log("newOrder active", orders)

      return orderResponse

    } catch (error) {
      console.error('Order failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // =========================
  // TOGGLE ORDER VIEW
  // =========================
  const toggleOrder = (orderId) => {
    const order = orders.value.find(
      (o) => o.orderId === orderId
    )

    if (order) {
      order.open = !order.open
    }
  }

  const toggleFullId = (orderId) => {
    const order = orders.value.find((o) => o.orderId === orderId)

    if(order){
      order.fullId = !order.fullId
    }
  }

  

  // =========================
  // EXPORTS
  // =========================
  return {
    orders,
    loading,
    loadOrders,
    createOrder,
    toggleOrder,
    toggleFullId,
  }
})