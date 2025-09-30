// import { getProduct } from '../data/products.js';

function getOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

function updateCartQuantityToOrders() {
  const orders = getOrders();
  let total = 0;
  orders.forEach(order => {
    order.products.forEach(prod => {
      total += prod.quantity;
    });
  });
  const cartQuantityElem = document.querySelector('.js-cart-quantity');
  if (cartQuantityElem) cartQuantityElem.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantityToOrders();
  const ordersGrid = document.querySelector('.orders-grid');
  const orders = getOrders();
   console.log('Loaded orders from localStorage:', orders);
  if (!ordersGrid) return;
  if (!orders.length) {
    ordersGrid.innerHTML = '<div class="no-orders">No orders placed yet.</div>';
    return;
  }
  let html = '';
  orders.forEach(order => {
    html += `<div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${new Date(order.date).toLocaleDateString()}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
      </div>
      <div class="order-details-grid">`;
    console.log('Order products for order', order.id, order.products);
    if (!order.products || order.products.length === 0) {
      html += `<div class='no-products'>No products found in this order.</div>`;
    } else {
      order.products.forEach(prod => {
        // Use global products array if available
        let product = null;
        if (window.getProduct) {
          product = window.getProduct(prod.productId);
        } else if (window.products) {
          product = window.products.find(p => p.id === prod.productId);
        }
        if (!product) return;
        html += `
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-delivery-date">Arriving on: <b>${prod.estimatedDeliveryTime ? new Date(prod.estimatedDeliveryTime).toLocaleDateString() : ''}</b></div>
            <div class="product-order-date">Ordered on: ${prod.orderDate ? new Date(prod.orderDate).toLocaleDateString() : ''}</div>
            <div class="product-quantity">Quantity: ${prod.quantity}</div>
          </div>
          <div class="product-actions">
            <button class="track-package-button button-secondary js-track-link" data-order-id="${order.id}" data-product-id="${product.id}">Track Package</button>
            <button class="cancel-order-button js-cancel-order" data-order-id="${order.id}" data-product-id="${product.id}">Cancel Order</button>
          </div>
        `;
      });
    }
    html += '</div></div>';
  });
  ordersGrid.innerHTML = html;

  // Save orderId and productId for tracking and redirect to tracking page
  document.querySelectorAll('.js-track-link').forEach(link => {
    link.addEventListener('click', function() {
      sessionStorage.setItem('trackOrderId', link.dataset.orderId);
      sessionStorage.setItem('trackProductId', link.dataset.productId);
      window.location.href = 'tracking.html';
    });
  });

  // Buy it again functionality
  document.querySelectorAll('.js-buy-again').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = btn.dataset.productId;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ productId, quantity: 1, deliveryOptionId: '1' });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // Optionally show a message or update cart count
      alert('Added to cart!');
    });
  });

  // Cancel order functionality
  document.querySelectorAll('.js-cancel-order').forEach(button => {
    button.addEventListener('click', function() {
      const orderId = button.dataset.orderId;
      const productId = button.dataset.productId;
      
      if (confirm('Are you sure you want to cancel this order?')) {
        let orders = getOrders();
        const orderIndex = orders.findIndex(order => order.id === orderId);
        
        if (orderIndex !== -1) {
          // Find the product in the order
          const order = orders[orderIndex];
          const productIndex = order.products.findIndex(prod => prod.productId === productId);
          
          if (productIndex !== -1) {
            // Remove the product from the order
            order.products.splice(productIndex, 1);
            
            // If order has no more products, remove the entire order
            if (order.products.length === 0) {
              orders.splice(orderIndex, 1);
            }
            
            // Save updated orders back to localStorage
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Refresh the page to show updated orders
            location.reload();
          }
        }
      }
    });
  });
});


