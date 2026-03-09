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
                <div class="dropDown" v-if="items.variants?.length" @click="toggleDropdown(index)">Type
                    <div class="dropDownArrow"  ></div>
                </div>
                
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
    .clicker:hover {
        cursor: pointer;
    }
    .clicker p {
        color: white;
    }
    .clicker p:active {
        color: #ffbb00;
    }
    .dropDownContainer {
        display: flex;
    }
    .dropDown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        height: auto;
        background-color: white;
        border-radius: 5px;
        padding: 0 5px;

    }
    .dropDown:hover {
        cursor: pointer;        
    }
    .dropDownArrow {
        height: 10px;
        width: 10px;
        display: inline-block;
        animation: oscillate ease-in-out 1s infinite;
        border: 3px solid black;
        rotate: 45deg; 
        border-top: transparent;
        border-left: transparent;
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
        border-radius: 10px;
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
        height: auto;
        margin: auto;
        border-radius: 10px;
    }
    img {
        object-fit:contain;
        width: 100%;
        height: 100%;
    }

    p{
        margin: 5px;
        margin-left: 10px;
        font-family: 'DmSans';
        font-weight: 600;
        font-size: 20px;

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

    @keyframes oscillate {
        from {
            transform: translateX(-5px);

        }
        to {
            transform: translateY(5px);

        }
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
</script>
