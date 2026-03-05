<template>
  <div class="container">
    <h2>Your Orders</h2>

    <div v-if="orderStore.orders.length === 0">
      No orders yet.
    </div>

    <div
      v-for="order in orders"
      :key="order.orderId"
      class="order-card">
      <div class="top">
        <div class="orderInfo">
        <div class="imageContainer">
          <img :src="orderImage"/>
        </div>
        <p @click="toggleId(order.orderId)" class="hoverPointer">Order 
          <span v-if="order.fullId">
            {{ order.orderId }}
          </span>
          <span v-else>
            {{ shortId(order.orderId) }}
          </span>
        </p>
      </div>
        <div class="dropDownContainer">
          <p class="exception"> {{ formatDate(order.date) }}</p>
          <div class="dropDown" @click="toggleOrder(order.orderId)"></div>
        </div>
      </div>
      <div v-show="order.open" class="orderItems">
        <div v-for="item in order.items" :key="item.menuId" class="orderItem">
          <p v-if="item.variants?.length">{{ item.variants.variantName }}</p>
          <p v-else>{{ item.menuName }} × {{ item.quantity }}</p>
          <p> {{ formatNaira(item.unitPrice * item.quantity) }}</p>
        </div>
        <div>
          <p>Delivery <span>{{formatNaira(delivery)}}</span></p>
        </div>
        <br />
        <hr>
        
        <div>
          <p class="total">Total</p>
        <span>{{ formatNaira(order.total + delivery) }}</span>
        </div>
    
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { storeToRefs } from 'pinia';
import orderImage from '@/components/icons/cartImage.png'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const delivery = 1200;
console.log(orders)
const toggleId = (id) => {
  orderStore.toggleFullId(id)
}
const shortId = (orderId) => {
  return `${orderId.slice(0,8)}...  `
}

console.log(orders.value)
const toggleOrder = (id) => {
  orderStore.toggleOrder(id)
}

const formatNaira = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)

const formatDate = (date) =>
  new Date(date).toLocaleString()
</script>

<style scoped>
.container {
  font-family: 'DmSans';
  margin: 0 50px;
}

.order-card {
  display: flex;
  flex-direction: column;
  padding: 20px 5px;
  border: solid 1px grey;
  align-content: center;
  background-color: #d9d9d9;
  margin: 20px 0;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.top {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    border: solid 1px grey;
    align-content: center;
    background-color: #d9d9d9;
    margin: 20px 0;
    border: none;
}

.orderInfo {
    display: flex;
    gap: 30px;
  }
  .orderContainer {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  span{
    float: right;
  }

  .imageContainer {
    width: 100px;
    height: 100px;
  }


  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  p {
    margin: auto 0;
  }

  .dropDownContainer {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-right: 30px;
  }

  .dropDown {
    border: 1px solid black;
    border-left: transparent;
    border-top: transparent;
    transform: rotate(45deg);
    height: 10px;
    width: 10px;
  }
  .dropDown:hover {
    cursor: pointer;
  }

  .orderItems {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
  }

  .orderItem {
    display: flex;
    justify-content: space-between;
    
  }

  hr {
    background-color: black;
    height: 1px;
    border-color: white;
  }

  .total {
    display: inline;
  }

  .hoverPointer:hover {
    cursor: pointer;
    color: green;
  }
  

  </style>