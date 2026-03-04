<template>
    <h2 id="menu">Meals You'll Enjoy</h2>
    <h3>Freshly made meals you'll love, ready to order.</h3>
    
    <div class="superContainer">
        <div class="menu">
            <div v-if="loading" class="loader"></div>
            <div v-if="error" class="error">{{ error }}</div>
        <div class="menuItems" v-for="(items, index) in menuItems.items" :key="index">
            
            <div class="imageContainer">
                <img :src="items.imageUrl" />
            </div>
            <div class="dropDownContainer">
                <p>{{ items.name }} </p>
                <div class="dropDown" v-if="items.variants?.length" @click="toggleDropdown(index)"></div>
            </div>
            
            <p>₦{{ items.price }}</p>
            <div v-if="items.variants?.length">
                <div class="clicker" v-for="variant in items.variants" :key="variant.variantName">
                    <p v-show="openItemId" @click="add(items, variant)">{{ variant.variantName }} - {{ variant.price }}</p>
                    <!-- <button @click="add(variant)">add</button> -->
                </div>
            </div>

            <button v-if="!items.variants?.length" @click="add(items)">Add to Cart</button>

        </div>
    </div>
    </div>
</template>

<style scoped>
    .clicker {
        background-color: #000;
    }
    .dropDownContainer {
        display: flex;
    }
    .dropDown {
        height: 10px;
        width: 10px;
        margin: auto;
        border: 3px solid black;
        border-top: transparent;
        border-left: transparent;
        transform: rotate(45deg);
        /* display: inline; */
        margin-left: 40px;
    }
    h2 {
        text-align: center;
        margin-top: 50px;
    }

    h3 {
        margin-bottom: 30px;
        font-family: 'DMSans';
        font-weight: 300;
        text-align: center;
    }

    .superContainer {
        width: 100%;
        height: auto;
    }

    .menu {
        display: flex;
        margin: 40px 50px;

    }
    .menuItems {
        width: 20%;
        min-height: 200px;
        height: auto;
        background: #FFA500;
        margin: 0 20px;
        margin-bottom: 10px;
        padding: 20px 20px;
        border-radius: 5px;
    }

    /* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  padding: 8px;
  margin: 0 auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}

    .error {
        font-family: 'DmSans'; 
        background-color: black; 
        height: auto;
        margin: 0 auto;
        color: red;
        border-radius: 20px;
        text-align: center;
        width: 200px;
    }

    .imageContainer {
        width: 90%;
        height: 50%;
        margin: auto;
        border-radius: 5px;
    }
    img {
        object-fit:contain;
        width: 100%;
        height: 100%;
    }

    p{
        margin: 5px;
        margin-left: 10px;

    }
    p:last-of-type{
        color: white;
    }

    button {
        width: 90%;
        margin: 40px 10px;
        padding: 10px 0;
        background: black;
        color: white;
        border-radius: 20px;
        border: none;

    }

    button:hover {
        box-shadow: 0 0 10px #000;
        cursor: pointer;
    }

</style>

<script setup>
    import { reactive, onMounted, ref } from 'vue';
    import { useCartStore } from '@/stores/cartStore';
    import { getMenuItems } from '@/services/menuService';


    const menuItems = reactive({
        items: []
    });
    const loading = ref(true);
    const error = ref(null)

    onMounted(async () => {
        try{
            menuItems.items = await getMenuItems()            
        } catch(err) {
            error.value = err.message          ;
            // console.log(err.response.statusText)
        }finally{
            loading.value = false;
        }
        
    })

    const cartStore = useCartStore()
    function add(item, variant = null) {
        cartStore.addToCart(item, variant)
        console.log(item)
    }

    const openItemId = ref(null)

const toggleDropdown = (index) => {
  openItemId.value = openItemId.value === index ? null : index
}

    

    // const addToCart = (food) => {
    //     const existingItem = cart.items.find(
    //         item => String(item.id) === String(food.id)
    //     )

    //     if(existingItem) {
    //         existingItem.quantity++
    //     }else {
    //         cart.items.push({
    //             ...food,
    //             quantity: 1
    //         })
    //     }
    // }
</script>
