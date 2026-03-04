<template>
    <div class="superContainer">
        <div class="container">
        <div class="tag">
            Confirm your order
        </div>
        <form @submit.prevent="submitForm">
            <label for="phone">Enter your phone number to confirm your order</label>
            <input v-model.trim="form.phoneNumber" type="tel" name="phone" placeholder="PHONE" required=""/>
            <label for="name">Enter your name</label>
            <input v-model="form.customerName" type="text" name="name" placeholder="NAME" required />
            <button :disabled="loading">{{ loading ? 'Registering...' : 'Checkout' }}</button>
        </form>
    </div>
    </div>
</template>

<style scoped>
    .superContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        backdrop-filter: blur(10px);
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .container {
        font-family: 'DmSans';
        font: 600;
        background-color: white;
        box-shadow: 0 0 12.5px 0 grey;
        width: 50%;
        margin: 30px auto;
        display: flex;
        flex-direction: column;
        border-radius: 11px;
        padding: 20px;
    }
    .tag {
        border-radius: 5px;
        padding: 10px;
        background-color: grey;
        margin: 10px 0;
        min-width: 200px;
        max-width: 40%;
    }

    input {
        display: block;
        width: 80%;
        background-color: #f2f2f2;
        margin: 10px 0;
        border: none;
        height: 30px;
    }
    input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="text"]:focus{
        outline: none;
        border: none;
        padding: auto;
        margin-left: 1ch;
        
    }
    button {
        background-color: #fffdd0;
        min-width: 100px;
        max-width: 60%;
        margin: 10px 0;
        border: none;
        padding: 10px;
        border-radius: 5px;
    }

</style>

<script setup>
    import { customerRegistration } from '@/services/registrationService'; 
    import { ref, reactive, defineEmits } from 'vue';
    import { useAuthStore } from '@/stores/authStore';

    const emit = defineEmits(['success', 'close']);

    const form = reactive({
        "phoneNumber": '',
        "customerName": ''
    })

    const loading = ref(false)
    const error = ref('')

    const submitForm = async () => {
        error.value = ''

        //basic validation
        if(!form.customerName || !form.phoneNumber) {
            error.value = 'All fields are required'
            alert(error)
            return
        }

        try {
            loading.value = true

            const customer = await customerRegistration(form)

            useAuthStore.login(customer)

            console.log('Registered:', customer.name)

            localStorage.setItem('customer', JSON.stringify(customer));

            alert("✅ Customer registered successfully")

            emit('success')
            
            emit('close')
        }catch (err) {
            console.log(err.message)
            error.value = err.response?.data?.message || 'Registration failed'

            console.log(error.value)
        } finally {
            loading.value = false
        }
    }


</script>