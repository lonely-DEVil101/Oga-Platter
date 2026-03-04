import Home from "@/components/pages/Home.vue";
import Cart from "@/components/pages/Cart.vue";
import OrderHistory from "@/components/pages/OrderHistory.vue";
import { createRouter, createWebHistory} from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path:"/", component:Home},
        {path:"/cart", component:Cart},
        {path:"/orders", component: OrderHistory}
    ],
})

export default router ;