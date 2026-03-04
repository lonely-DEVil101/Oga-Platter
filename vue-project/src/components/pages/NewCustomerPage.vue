<template>
    <div class="container">
        <div class="header">
            <span>
                <img :src="backArrow" />
            </span>
            <div class="id">
                <div class="circle"></div>
                <p>MY ACCOUNT</p>
            </div>
            
        </div>
        <div>
            Phone Number
            <div class="phone">09144356789</div>
        </div>
        <div class="orderHistory">
            <p>Order History</p>
            <div class="order">
                <div class="orderInfo">
                    <span>
                        <img :src="orderIcon" />
                    </span>
                    <div>Order 1183</div>
                </div>
                <div class="date">
                    <p>{{ formattedDate
                     }}</p>
                    <div class="dropDown"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 20px;
    }
    .phone {
        background-color: #f2f2f2;
        width: 15%;
        padding: 10px;
        border-radius: 5px;
    }
    .order {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0px 40px;
        align-items: center;
        background-color: #f2f2f2;
        overflow: hidden;
    }
    .orderInfo {
        justify-self: start;
        display: flex;
        align-items: center;
    }
    .date {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
    .date > p {
        margin-right: 30px;
    }
    .header {
        display: flex;
        /* width: 100vw; */
    }
    .id {
        margin: auto auto;
        margin-top: 20px;
    }
    .dropDown {
        width: 10px;
        height: 10px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        transform:rotate(45deg);
    }
    .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: grey;
        margin: auto auto;
    }
</style>

<script setup>
    import { ref, computed } from 'vue'
    import backArrow from '@/assets/Back Icon.png'
    import orderIcon from '@/components/icons/orderIcon.png'
    const now = ref(new Date());
    const formattedDate = computed(() => {
        const date = String(now.value.getDate()).padStart(2, "0");
        const month = String(now.value.getMonth() + 1).padStart(2, '0');
        const year = String(now.value.getFullYear()).slice(-2);
        return `${date}/${month}/${year}`
    })
</script>