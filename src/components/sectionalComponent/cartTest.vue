<template>
    <cartHeader></cartHeader>
  
    <!-- Empty Cart -->
    <div v-if="cartStore.cart.length === 0">
      <emptyCart></emptyCart>
    </div>
  
    <!-- Cart Items -->
    <div v-else>
      <div class="container">
        <!-- Table headers (desktop only) -->
        <div class="tableHeaderGroup">
          <div>Item</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
  
        <!-- Cart items -->
        <div class="item" v-for="item in cartStore.cart" :key="item.id">
          <!-- Item image + name -->
          <div class="itemHeader">
            <span class="foodImage">
              <img :src="item.imageUrl" />
            </span>
            <div class="itemName">
              {{ item.variantId ? item.variantName : item.name }}
            </div>
          </div>
  
          <!-- Price -->
          <div class="itemPrice">Price: {{ formatNaira(item.price) }}</div>
  
          <!-- Quantity -->
          <div class="quantity">
            <span class="icons" @click="reduceQuantity(item)">
              <img :src="minusIcon" />
            </span>
            <input type="number" v-model="item.quantity" min="1" />
            <span class="icons" @click="increaseQuantity(item)">
              <img :src="addIcon" />
            </span>
          </div>
  
          <!-- Subtotal -->
          <div class="subtotal">Subtotal: {{ formatNaira(subTotal(item)) }}</div>
        </div>
      </div>
  
      <!-- Subtotal & Checkout -->
      <div class="subTotalContainer">
        <div>
          <span class="left">Subtotal</span>
          <span class="right">{{ formatNaira(totalSub) }}</span>
        </div>
        <div>
          <span class="left">Delivery</span>
          <span class="right">{{ formatNaira(delivery) }}</span>
        </div>
        <hr />
        <div>
          <span class="left">Total</span>
          <span class="right">{{ formatNaira(totalAmount) }}</span>
        </div>
        <button @click="openModal" type="button">Proceed to Checkout</button>
      </div>
  
      <!-- Modals -->
      <Registration v-if="showRegistration" @close="closeModal" @success="handleRegistrationSuccess" />
      <Login v-if="showLogin" @close="showLogin = false" @register="openRegistration" @success="handleLoginSuccess" />
    </div>
  </template>
  
  <script setup>
  import cartHeader from './cartHeader.vue'
  import { useCartStore } from '@/stores/cartStore'
  import emptyCart from '@/components/sectionalComponent/emptyCart.vue'
  import addIcon from '@/assets/add_2.png'
  import minusIcon from '@/assets/remove.png'
  import { ref, computed, defineAsyncComponent } from 'vue'
  import Login from './Login.vue'
  import { useAuthStore } from '@/stores/authStore'
  import { useOrderStore } from '@/stores/orderStore'
  import { useRouter } from 'vue-router'
  
  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const orderStore = useOrderStore()
  const router = useRouter()
  
  const showRegistration = ref(false)
  const showLogin = ref(false)
  const Registration = defineAsyncComponent(() => import('./Registration.vue'))
  
  const delivery = 1200
  
  // Computed totals
  const subTotal = (item) => item.quantity * item.price
  const totalSub = computed(() =>
    cartStore.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  )
  const totalAmount = computed(() => totalSub.value + delivery)
  
  // Formatting
  const formatNaira = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  
  // Quantity controls
  const increaseQuantity = (item) => cartStore.increaseQuantity(item)
  const reduceQuantity = (item) => {
    if (item.quantity > 1) item.quantity--
    else cartStore.reduceQuantity(item)
  }
  
  // Modal logic
  const openModal = () => {
    if (!authStore.isLoggedIn) {
      showLogin.value = true
      return
    }
    proceedToPayment()
  }
  const closeModal = () => (showRegistration.value = false)
  const openRegistration = () => {
    showLogin.value = false
    showRegistration.value = true
  }
  const handleLoginSuccess = async (customer) => {
    alert(`Welcome ${customer.customerName}`)
    showLogin.value = false
    authStore.restoreSession()
    await new Promise((r) => setTimeout(r, 50))
    await proceedToPayment()
  }
  const handleRegistrationSuccess = () => {
    showRegistration.value = false
    showLogin.value = true
  }
  
  const proceedToPayment = async () => {
    try {
      const order = await orderStore.createOrder(cartStore.cart)
      sendWhatsApp(order)
      router.push('/orders')
    } catch (error) {
      console.error(error)
      alert('Failed to place order')
    }
  }
  const sendWhatsApp = async (order) => {
    const message = `${order.message}\nTotal: ${order.totalAmount + delivery}\nStatus: ${order.status}\nOrder Id: ${order.orderId}`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/+2347053000005?text=${encoded}`, '_blank')
  }
  </script>
  
  <style scoped>
  /* Container */
  .container {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto auto;
    font-family: 'DmSans';
    font-weight: 600;
    gap: 15px;
  }
  
  /* Table headers */
  .tableHeaderGroup {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    margin-bottom: 15px;
  }
  
  /* Cart items */
  .item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    gap: 10px;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
  }
  
  /* Item image */
  .foodImage {
    width: 50px;
    height: 50px;
  }
  .foodImage img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  /* Quantity controls */
  .quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fffdd0;
    border-radius: 5px;
    height: 30px;
    width: 50%;
  }
  .quantity input {
    width: 3ch;
    text-align: center;
    border: none;
    outline: none;
    background: transparent;
    margin: 0 5px;
  }
  .icons {
    width: 15px;
    height: 15px;
  }
  .icons img {
    width: 100%;
    height: 100%;
  }
  
  /* Subtotal & checkout */
  .subTotalContainer {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 20px;
    margin: 20px auto;
    width: 90%;
  }
  .subTotalContainer .left {
    float: left;
    font-weight: 400;
  }
  .subTotalContainer .right {
    float: right;
    font-weight: 600;
  }
  .subTotalContainer button {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    border: none;
    border-radius: 5px;
    background-color: #fffdd0;
    font-weight: 500;
    cursor: pointer;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .tableHeaderGroup {
      display: none; /* hide headers on mobile */
    }
  
    .container {
      grid-template-columns: 1fr; /* stack items */
    }
  
    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  
    .itemHeader,
    .itemPrice,
    .quantity,
    .subtotal {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  
    .quantity {
      width: 100%;
      justify-content: space-around;
    }
  
    .foodImage {
      width: 60px;
      height: 60px;
    }
  
    .subTotalContainer {
      width: 95%;
      padding: 15px;
    }
  }
  
  @media (max-width: 480px) {
    .quantity input {
      width: 2ch;
    }
    .subTotalContainer button {
      padding: 10px;
    }
  }
  </style>