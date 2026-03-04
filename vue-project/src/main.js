import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import router from '@/router/routes'
import App from './App.vue'

const app = createApp(App);



app.use(router)
app.use(createPinia())
const authStore = useAuthStore()
authStore.restoreSession()
app.mount('#app')

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        })
    }
}


