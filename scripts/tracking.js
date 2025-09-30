import { getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function getOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

function getTrackingStatus(orderDate, estimatedDeliveryDate) {
  const now = dayjs();
  const order = dayjs(orderDate);
  const delivery = dayjs(estimatedDeliveryDate);
  const totalTime = delivery.diff(order);
  const elapsedTime = now.diff(order);
  const progress = Math.min(Math.max(elapsedTime / totalTime, 0), 1);

  const steps = [
    { status: "Order Placed", completed: true },
    { status: "Preparing for Shipment", completed: progress >= 0.25 },
    { status: "Shipped", completed: progress >= 0.5 },
    { status: "Out for Delivery", completed: progress >= 0.75 },
    { status: "Delivered", completed: progress >= 1 }
  ];

  const currentStepIndex = steps.findLastIndex(step => step.completed);
  return { steps, currentStepIndex };
}

async function loadPage() {
  const trackingContainer = document.querySelector('.js-order-tracking');
  const orderId = sessionStorage.getItem('trackOrderId');
  const productId = sessionStorage.getItem('trackProductId');
  
  if (!orderId || !productId) {
    trackingContainer.innerHTML = `
      <div class="tracking-error">No tracking information available.</div>
      <a href="orders.html" class="back-to-orders-link">← Back to Orders</a>
    `;
    return;
  }

  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    trackingContainer.innerHTML = `
      <div class="tracking-error">Order not found.</div>
      <a href="orders.html" class="back-to-orders-link">← Back to Orders</a>
    `;
    return;
  }

  const orderProduct = order.products.find(p => p.productId === productId);
  const product = getProduct(productId);

  if (!orderProduct || !product) {
    trackingContainer.innerHTML = `
      <div class="tracking-error">Product not found.</div>
      <a href="orders.html" class="back-to-orders-link">← Back to Orders</a>
    `;
    return;
  }

  const { steps, currentStepIndex } = getTrackingStatus(
    orderProduct.orderDate,
    orderProduct.estimatedDeliveryTime
  );

  const stepsHtml = steps.map((step, index) => `
    <div class="step ${step.completed ? 'completed' : ''} ${index === currentStepIndex ? 'active' : ''}">
      <div class="step-circle"></div>
      <div class="step-label">${step.status}</div>
    </div>
  `).join('');

  trackingContainer.innerHTML = `
    <a href="orders.html" class="back-to-orders-link">← Back to Orders</a>
    
    <div class="order-tracking">
      <div class="tracking-header">
        <div class="tracking-title">Track Your Package</div>
      </div>

      <div class="tracking-info">
        <div class="tracking-detail">
          <div class="detail-label">Order ID</div>
          <div class="detail-value">${order.id}</div>
        </div>
        <div class="tracking-detail">
          <div class="detail-label">Order Date</div>
          <div class="detail-value">${dayjs(orderProduct.orderDate).format('MMM D, YYYY')}</div>
        </div>
        <div class="tracking-detail">
          <div class="detail-label">Estimated Delivery</div>
          <div class="detail-value">${dayjs(orderProduct.estimatedDeliveryTime).format('MMM D, YYYY')}</div>
        </div>
      </div>

      <div class="product-info">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-meta">Quantity: ${orderProduct.quantity}</div>
        </div>
      </div>

      <div class="delivery-date">
        ${currentStepIndex === steps.length - 1 
          ? 'Delivered' 
          : `Arriving ${dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D')}`}
      </div>

      <div class="status-steps">
        ${stepsHtml}
      </div>
    </div>
  `;
}

// Initialize tracking info when the page loads
loadPage();
