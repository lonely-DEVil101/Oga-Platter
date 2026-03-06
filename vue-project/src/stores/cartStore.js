import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'
import { stringifyQuery } from 'vue-router'

export const useCartStore = defineStore('cart', () => {

  const cart = ref([])
  const authStore = useAuthStore()


  const cartCount = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })
  // LOAD CART FOR CURRENT USER
  function loadCart() {
    // const customer = authStore.customer

    // if (!customer) {
    //   cart.value = []
    //   return
    // }

    const saved = localStorage.getItem(
      `ogaCart`
    )

    cart.value = saved ? JSON.parse(saved) : []
    console.log(cart.value)
  }

  // SAVE CART
  function saveCart() {
    const customer = authStore.customer

    // if (!customer) return

    localStorage.setItem(
      `ogaCart`,
      JSON.stringify(cart.value)
    )
  }

  // ADD ITEM
  function addToCart(item, variant = null) {
    const variantId = variant ? variant.id : null;
    const variantName = variant ? variant.variantName : null;
    const price = variant ? variant.price : item.price;

    const existing = cart.value.find(
      p => String(p.menuId) === String(item.menuId) && String(p.variantId) === String(variantId)
    )

    if (existing) existing.quantity++
    else cart.value.push({   
      menuId: item.menuId,
      name: item.name,
      variantId,
      variantName,
      imageUrl: item.imageUrl,

      price,      
      quantity: 1})

      console.log(cart)

    saveCart()
  }

  // REDUCE QUANTITY
  function reduceQuantity(item) {
    const existing = cart.value.find(
      p => String(p.menuId) === String(item.menuId) && String(p.variantId) === String(item.variantId)
    )

    if (!existing) return

    if (existing.quantity > 1) existing.quantity--
    else cart.value = cart.value.filter(
      i => i.menuId !== item.menuId
    )

    saveCart()
  }

  function increaseQuantity(item) {
    const existing = cart.value.find(
      p =>
        String(p.menuId) === String(item.menuId) &&
        String(p.variantId) === String(item.variantId)
    )
  
    if (!existing) return
  
    existing.quantity++
    saveCart()
  }

  // CLEAR CART
  function clearCart() {
    const authStore = useAuthStore()
    const customer = authStore.customer

    if (customer) {
      localStorage.removeItem(`ogaCart`)
    }

    cart.value = []
  }

  return {
    cart,
    loadCart,
    addToCart,
    cartCount,
    reduceQuantity,
    increaseQuantity,
    clearCart
  }
})