<template>
    <div @click.self="close" class="overlay">
        <div class="loginCard">
            <form @submit.prevent="submitLogin" >
            <h3>Login to Continue</h3>

            <input v-model.trim="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                required 
            />

            <button :disabled="loading" :class="{'logging': loading}">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
        </form>
        <p>
            New customer?
            <span class="register" @click="goToRegister">Register here</span>
        </p>
        </div>
        
    </div>
</template>

<style scoped>
    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        backdrop-filter: blur(10px);
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        font-family: 'DmSans';
    }
    .loginCard {
        background-color: #f2f2f2;
        padding: 30px;
        border-radius: 5px;
        width: 420px;
        max-width: 94vw;
    }
    input {
        display: block;
        width: 80%;
        background-color: #f2f2f2;
        margin: 10px 0;
        border: none;
        border: 1px solid grey;
        height: 30px;
        font-family: 'DmSans';
    }
    input[type="tel"]::-webkit-inner-spin-button, input[type="tel"]::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="tel"]:focus{
        outline: none;
        padding: auto;
    }
    button {
        background-color: #fffd00;
        border: none;
        height: 30px;
        padding: 0 10px;
        border-radius: 5px;
    }

@media (max-width: 480px) {
    .loginCard {
        padding: 18px;
    }

    input {
        width: 100%;
    }

    button {
        width: 100%;
    }
}
    .logging {
        background-color: green;
        color: white
    }
    .register {
        text-decoration: underline;
    }
    .register:hover {
        cursor: pointer;
        color: green;
    }
</style>

<script setup>
import { ref, defineEmits } from 'vue'
import { loginAuth } from '@/services/loginAuthService'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits(['success', 'close', 'register'])

const authStore = useAuthStore()
const phoneNumber = ref('')
const loading = ref(false)
const error = ref('')
const goToRegister = () => {
    emit('register')
}

const submitLogin = async () => {

    error.value = ''

    try {
        loading.value = true

        // 1️⃣ call backend login
        const customer = await loginAuth(phoneNumber.value)

        // 2️⃣ save session locally
        // localStorage.setItem(
        //     'customer',
        //     JSON.stringify(customer)
        // )

        authStore.login(customer)

        // alert("Welcome ", customerName)

        // 3️⃣ notify parent component
        emit('success', customer)

        // 4️⃣ close modal
        emit('close')

    } catch (err) {
        error.value =
            err.response?.data?.message ||
            'Login failed'

        alert("Number not registered. Please create an account")
    } finally {
        loading.value = false
    }
}

const close = () => {
        emit('close')    
    } 
</script>
