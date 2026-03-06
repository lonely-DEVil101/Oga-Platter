<template>
    <cartHeader></cartHeader>
    <div v-if="cartStore.cart.length === 0">
        <emptyCart></emptyCart>
    </div>
    <div v-else>
        <div class="container">
            <div class="subContainer">
                <div class="tableHeaderGroup">
                <div>Item</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                </div>
                <div class="item" v-for="item in cartStore.cart"
                :key="item.id">
                    <div style="display:flex; width: 100%; align-items: center;">
                        <span style="float:left" class="foodImage"><img :src="item.imageUrl" /></span>
                    
                        <div style="margin-left: 20px " v-if="!item.variantId">{{ item.name }}</div>
                        <div style="margin-left: 20px " v-else>{{ item.variantName }}</div>
                    </div>
                    <div>{{ formatNaira(item.price) }}</div>
                    <div class="quantity" >
                        <span class="icons" @click="reduceQuantity(item)">
                            <img :src="minusIcon" />
                        </span>
                        <input type="number" v-model="item.quantity" min="1" name="quantity" />
                        <span class="icons" @click="increaseQuantity(item)">
                            <img :src="addIcon" />
                        </span>
                    </div>
                    <div class="subtotal">
                    {{formatNaira(subTotal(item))}}

                    </div>
                </div>
            </div>
            <div class="subTotalContainer">
                <div>
                    <span class="left">Subtotal</span>
                    <span class="right">{{ formatNaira(totalSub) }}</span>
                </div>
                <div>
                    <span class="left">Delivery </span>
                    <span class="right"> {{ formatNaira(delivery) }}</span>
                </div>
                <hr style="margin: 20px 10px" />
                <div>
                    <span class="left">Total</span>
                    <span class="right">{{ formatNaira(totalAmount) }}</span>
                </div>
                <button @click="openModal" type="button"> Proceed to Checkout </button>
            </div>
        </div>
        <Registration v-if="showRegistration" @close="closeModal"
        @success="handleRegistrationSuccess"></Registration>
        <Login
        v-if="showLogin"
        @close="showLogin = false"
        @register="openRegistration"
        @success="handleLoginSuccess"
        />
    </div>
    
</template>

<style scoped>

.container {
    width: 90%;
    display: grid;
    grid-template-columns: auto auto;
    font-family: 'DmSans';
    font-weight: 600;
    padding: 0 5vw;
    margin: 0 auto;
}
.subTotalContainer {
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 100%;
    min-height: 60%;
    max-height: 500px;
    padding: 20px 10px;
    background-color: #F2F2F2;
    border-radius: 5px;
    margin-top: calc(1lh + 20px);
    font-family: 'DmSans';
}

.left{
    float: left;
    font-weight: 400;
}
.right{
    float: right;
    font-weight: 600;
}
.header {
    display: flex;
    margin-bottom: 40px;
    padding: 20px;
}
.item {
    background-color: #F2F2F2;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
}
.tableHeaderGroup {
    margin-bottom: 20px;
}
    
    .backIcon img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: inline;
    }
    .tableHeaderGroup, .item{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        justify-items: center;
    }

    .foodImage {
        width: 50px;
        height: 50px;
    }
    .foodImage img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .quantity {
        background-color: #fffdd0;
        height: 30px;
        width: 50%;
        padding: 10px auto;
        display: flex;
        justify-content: center;
        border-radius: 5px;
    }
    input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"], input[type="number"]:focus{
        outline: none;
        border: none;
        width: 3ch;
        padding: auto;
        background-color: transparent;
        height: auto;
        margin-left: 1ch;
        
    }
    .icons {
        width: 10px;
        height: 10px;
    }
    .icons img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    button{
        border: none;
        background-color: #fffdd0;
        width: 80%;
        height: 3lh;
        padding: 20px auto;
        margin: 10px auto;
        border-radius: 5px;
        font-weight: 500;
    }
</style>

<script setup>
    import cartHeader from './cartHeader.vue';
    import { useCartStore } from '@/stores/cartStore'
    import emptyCart from '@/components/sectionalComponent/emptyCart.vue'
    import addIcon from '@/assets/add_2.png'
    import minusIcon from '@/assets/remove.png'
    import { ref, computed, defineAsyncComponent} from 'vue';
    import Login from './Login.vue';
    import { useAuthStore } from '@/stores/authStore';
    import { useOrderStore } from '@/stores/orderStore';
    import { useRouter } from 'vue-router';
    

    const cartStore = useCartStore()
    const showRegistration = ref(false);
    const showLogin = ref(false)
    const authStore = useAuthStore()
    const orderStore = useOrderStore()
    const router = useRouter()

    const Registration = defineAsyncComponent(() => import('./Registration.vue'))

    const openModal = () => {
  console.log("checkout clicked")

  // ✅ CHECK LOGIN FIRST
  if (!authStore.isLoggedIn) {
    showLogin.value = true
    return
  }

  // ✅ already logged in
  proceedToPayment()
}

    const closeModal = () => {
        showRegistration.value = false
    }

    const openRegistration = () => {
        showLogin.value = false
        showRegistration.value = true
    }

    const handleLoginSuccess = async (customer) => {
  alert(`Welcome ${customer.customerName}`)
  showLogin.value = false

  // ✅ ensure auth state + token restored
    authStore.restoreSession()

  // small delay ensures interceptor reads token
  await new Promise(resolve => setTimeout(resolve, 50))

  await proceedToPayment()
}

    const handleRegistrationSuccess = () => {
        console.log(" ready for payment")
        showRegistration.value = false
        showLogin.value = true

    }

    const proceedToPayment = async () => {
        console.log('entering try-catch block')
  try {
    console.log('Placing order...')
    console.log(cartStore.cart)

    const order = await orderStore.createOrder(
      cartStore.cart
    )
    console.log(order)



    console.log('Order success:', order)
    sendWhatsApp(order)

    // optional: clear cart after order
    // cartStore.clearCart()
    router.push('/orders')

  } catch (error) {
    console.error(error)
    alert('Failed to place order')
  }
}


const sendWhatsApp = async (order) => {
  // const itemsText = await order.items.map(item => `${item.variantName || item.menuName} x ${item.quantity}`)
  //   .join('\n');

  const orderMessage = await order.message;

  const orderNumber = `Order Id: ${order.orderId}`
  const totalText = `Total: ${order.totalAmount + delivery}`;
  const statusText = `Status: ${order.status}`;

  const message = `${orderMessage}\n${totalText}\n${statusText}\n${orderNumber}`;

  const encodedMessage = encodeURIComponent(message);

  const phoneNumber = '+2347053000005'; // Replace with actual number
  console.log("message Sent")

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

    //using isAuthenticated to proceed to login page
    

    const delivery = 1200



    const subTotal = (item) => {
         let subtotal= item.quantity * item.price;
         return subtotal;
    }

    const increaseQuantity = (item) => {
        cartStore.increaseQuantity(item)
    }
    const reduceQuantity = (item) => {
        if(item.quantity > 1){
            item.quantity--;
        }else {
            cartStore.reduceQuantity(item)
        }
    }
    
    
    

    const totalSub = computed(() => {
    return cartStore.cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
    }, 0);
    });
    const totalAmount = computed(() => totalSub.value + delivery)
        
    const formatNaira = (amount) => {
            return new Intl.NumberFormat( 'en-Ng', {
                style: 'currency',
                currency: 'NGN'
            }).format(amount);
    };

    
</script>
