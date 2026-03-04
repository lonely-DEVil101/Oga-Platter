import api from './api'

// -------------------------
// PLACE ORDER
// -------------------------
export const placeOrder = async (cartItems) => {

  const payload = {"items" : cartItems.map(item => ({
    menuId: item.menuId,
    variantId: item.variantId,
    quantity: item.quantity
  }))}

  console.log(payload)

  

  const response = await api.post('/orders/place', payload)
  console.log(response.data)
  

  return response.data
}


// -------------------------
// GET ORDER HISTORY
// -------------------------
export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders')
  return response.data.map(normalizeOrder)
}


// -------------------------
// NORMALIZER (VERY IMPORTANT)
// -------------------------
const normalizeOrder = (order) => ({
  orderId: order.id,
  status: order.status,
  date: order.orderDate,
  total: order.totalAmount,
  open: false,
  fullId: false,
  items: order.items.map(item => ({
    menuName: item.menuName,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    subtotal: item.subtotal
  }))
})