<template>
    <div class="container">
        <div class="subContainer">
            <div class="image">
            <img :src="emptyCartImage" />
        </div>
        <div ><h2>Your cart is empty</h2></div>
        <div><p>Items you add to cart will appear here</p></div>
        <div class="button"><button @click="goToSection('menu')">Start Ordering</button></div>
        </div>
    </div>
</template>

<style scoped>

    .container, .subContainer {
        display: flex;
        flex-direction: column;
        width: 100vw;
        justify-content: center;
        align-items: center;
        margin-top: -50px;
    }
    button {
        padding: 20px;
        color: black;
        background-color: #ffa500;
        align-self: center;
        height: auto;
        border: none;
        border-radius: 5px;
    }
    .image {
        height:200px;
        width: 200px;
    }
    img {
        /* margin-left: 300px; */
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    
</style>

<script setup>
    import emptyCartImage from '@/assets/emptyCart.png'
    import {  useScrollCart } from '@/scrollToSection'

    const { goToSection } = useScrollCart()
</script>