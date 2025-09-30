export let orders = JSON.parse(localStorage.getItem('orders')) || [];


// Accepts an array of cart items and creates a new order with products, delivery, and shipping info
export function addOrder(cartItems) {
  const orderId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  const now = new Date();
  const orderDate = now.toISOString();
  const products = cartItems.map(item => {
    const deliveryDays = getDeliveryDays(item.deliveryOptionId);
    const estimatedDelivery = new Date(now.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
    const shippingDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    return {
      productId: item.productId,
      quantity: item.quantity,
      deliveryOptionId: item.deliveryOptionId,
      estimatedDeliveryTime: estimatedDelivery.toISOString(),
      shippingDate: shippingDate.toISOString(),
      orderDate: orderDate
    };
  });
  const order = {
    id: orderId,
    date: orderDate,
    products
  };
  orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.unshift(order);
  saveToStorage();
}

function getDeliveryDays(deliveryOptionId) {
  // Simple mapping, update if needed
  if (deliveryOptionId === '1') return 7;
  if (deliveryOptionId === '2') return 3;
  if (deliveryOptionId === '3') return 1;
  return 7;
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}