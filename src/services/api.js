import axios from "axios"
import { useAuthStore } from "@/stores/authStore"


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()

    console.log('Interceptor triggered')

    const customer = authStore.customer


    // attach customer info if available
    if (customer) {
      config.headers['X-Customer-Id'] =
        customer.customerId

        console.log('Customer header added:', customer.id)
    }
    const savedToken = localStorage.getItem('token')
    console.log(savedToken)
    if (savedToken) {
        config.headers.Authorization = `Bearer ${savedToken}`
        console.log('authorization confirmed')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // success → pass response normally
    return response
  },
  (error) => {
    const authStore = useAuthStore()

    // Server responded with error
    if (error.response) {

      // Unauthorized (future JWT support)
      if (error.response.status === 401) {
        authStore.logout()
        alert('Session expired. Please login again.')
      }

      // Normalize error message
      const message =
        error.response.data?.message ||
        'Something went wrong'

      console.log(message)

      return Promise.reject(new Error(message))
    }

    // Network error
    return Promise.reject(
      new Error('Network error. Check connection.')
    )
  }
)

export default api