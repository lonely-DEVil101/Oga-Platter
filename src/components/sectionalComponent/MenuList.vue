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
        width: 100%;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 40px 24px;
}

    .menuItems {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: 200px;
        height: auto;
        background: #FFA500;
        margin: 0;
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.06);
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
        width: 100%;
        height: 180px;
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block;
    }

    p{
        margin: 5px;
        margin-left: 10px;
        font-family: 'DmSans';
        font-weight: 600;
        font-size: 20px;

    }
    

    button {
        width: 100%;
        display: block;
        margin: 16px 0 0 0;
        padding: 12px 0;
        background: black;
        color: white;
        border-radius: 12px;
        border: none;
        font-size: 16px;
        touch-action: manipulation;
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

    @media (max-width: 1024px) {

        .menu {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        padding: 30px 20px;
        }

        .menuItems { padding: 14px; }

    }

    @media (max-width: 768px) {

        .menu {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        padding: 20px;
        }

        .menuItems { min-height: 220px; padding: 12px; }

    }

    @media (max-width: 480px) {

        .menu {
        grid-template-columns: 1fr;
        padding: 16px;
        }

        .menuItems {
            min-height: auto;
            padding: 12px;
        }

        .imageContainer { height: 140px; }

        p { font-size: 16px; }
        button { padding: 10px 0; font-size: 15px; }

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
            error.value = err.message;
            // console.log(err.response.statusText)
        }finally{
            loading.value = false;
        }
        
    })

    const cartStore = useCartStore()
    function add(item, variant = null) {
        cartStore.addToCart(item, variant)
        console.log(item);
        console.log(cartStore.cart)
    }

    const openItemId = ref(null)

const toggleDropdown = (index) => {
  openItemId.value = openItemId.value === index ? null : index
}
</script>
