import api from './api'

export const customerRegistration = async (customerData) => {
  try {
    // Map frontend form fields → backend expected fields
    const payload = {
        "phoneNumber": customerData.phoneNumber,
      "customerName": customerData.customerName,
      
    }

    const response = await api.post('/auth/register', payload)

    // Normalize response for consistent frontend usage
    return {
      id: response.data.id || response.data.customerId,
      name: response.data.name || response.data.customerName,
    }
  } catch (err) {
    // throw an error with a meaningful message
    throw new Error(err.response?.data?.message || 'Registration failed')
  }
}
