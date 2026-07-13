import api from './api'

export const loginAuth =  async (phoneNumber) => {
    const response = await api.post('auth/login', {
        phoneNumber
    })
    return {
        message: response.message,
        id: response.data.customerId,
        customerName: response.data.customerName, 
        token: response.data.token || null
    }
}