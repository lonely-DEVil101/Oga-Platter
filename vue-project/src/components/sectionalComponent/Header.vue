<template>
    <div class="header">
        <div class="subContainer">
        <div class="links">
            <p @click="scrollToSection('home')">Home</p>
            <p @click="scrollToSection('menu')">Menu</p>
            <p @click="scrollToSection('about')">About</p>
        </div>
        <div class="headerIcon">
            <img :src=headerIcon />
        </div>
        <div class="contact">
            <p v-if="authStore.isLoggedIn" @click="scrollToSection('contact')">Contact</p>
            <p v-else @click="loginModal">Login</p>
            <div v-if="authStore.isLoggedIn">
                <img @click="toggleDropdown" :src=accountButton />
            </div>
            <div class="cartButton">
                <router-link to="/cart">
                    <img :src=cartButton />
                    <span v-if="cartStore.cartCount > 0" class="badge">
                        {{cartStore.cartCount}}
                    </span>
                </router-link>
            </div>
        </div>
        </div>
        <!-- <div class="welcomeDiv">
            <div v-if="authStore.isLoggedIn">
                Welcome {{ customer.customerName }}
            </div>
            <div v-else>
                Guest
            </div>
            <button @click="authStore.logout">logout</button>
        </div> -->
        <div v-if="showDropdown" class="dropdown">
      <div class="customer-name">
        {{ authStore.customer?.customerName }}
      </div>

      <button @click="goToOrders">
        View Order History
      </button>

      <button @click="logout">
        Logout
      </button>
    </div>
        <Registration
        v-if="showRegistration"
        @close = "showRegistration = false"
        @success="handleRegistrationSuccess" ><button @click="showRegistration = false">Close</button></Registration>
        <Login
        v-if="showLogin"
        @close="showLogin = false"
        @register = openRegistration
        @success="handleLoginSuccess"
        />
    </div>
</template>

<script setup>
    import headerIcon from '@/components/icons/headerIcon.png'
    import accountButton from '@/components/icons/accountButton.png'
    import cartButton from '@/components/icons/cartButton.png'
    import { useScroll } from '@/scrollToSection'
    import { useAuthStore } from '@/stores/authStore'
    import { useRouter } from 'vue-router'
    import { storeToRefs } from 'pinia'
    import {ref, onMounted, onBeforeMount} from 'vue'
    import Login from './Login.vue'
    import Registration from './Registration.vue'
    import { useCartStore } from '@/stores/cartStore'

    const { scrollToSection } = useScroll()
    const authStore = useAuthStore()
    const router = useRouter()
    const { customer } = storeToRefs(authStore)
    const cartStore = useCartStore()
    const showLogin= ref(false)
    const showRegistration = ref(false)

    const showDropdown = ref(false)
    const dropdownRef = ref(null)

    const toggleDropdown = () => {
        showDropdown.value = !showDropdown.value
    }

    const goToOrders = () => {
        showDropdown.value = false;
        router.push('/orders')
    }

    const logout = () => {
        authStore.logout()
        showDropdown.value = false
        router.push('/')
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
            showDropdown.value = false
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onBeforeMount(() => {
        document.removeEventListener('click', handleClickOutside)
    })

    const loginModal = () => {
        if(!authStore.isLoggedIn) {
            showLogin.value = true
            return
        }
    }

    const openRegistration = () => {
        showLogin.value = false
        showRegistration.value = true
    }

    const handleRegistrationSuccess = () => {
        console.log(" ready for payment")
        showRegistration.value = false
        showLogin.value = true
    }

    const handleLoginSuccess = (customer) => {
        alert(`Welcome ${customer.customerName}`)
        showLogin.value = false
    }

    
   
    // const emit = defineEmits(['scroll']);
    // const handleClick = (section) => {
    //     emit('scroll', section)
    // }
</script>

<style scoped>
    .header{
        background-color: #ffd;
        width: 100vw;
        padding: 0 30px;
    }
    .subContainer, .links, .contact {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        align-items: center;
    }

    .links > p:hover {
        cursor: pointer;
    }
    .contact:hover {
        cursor:pointer;
    }

    .links, .contact{
        height: 80%;
    }

    p{
        margin: 10px;
    }

    .cartButton {
        position: relative;
    }
    .badge {
  position: absolute;
  top: -6px;
  right: 10px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
}

    img{
        object-fit: cover;
        height: 10vh;
    }
    .contact img{
        width: 70%;
        height: 70%;
        margin-left: 10px;
        margin-right: 10px;
    }
    .contact p{
        background-color: black;
        color: white;
        width: 7vw;
        border-radius: 5px;
        text-align: center;
        padding: 5px 0;
    }
    .welcomeDiv {
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    .profile-wrapper {
  position: relative;
  display: inline-block;
}

.profile-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
  border-radius: 50%;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 45px;
  width: 220px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.customer-name {
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.dropdown button {
  background: #f5f5f5;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.dropdown button:hover {
  background: #fffdd0;
}
    </style>