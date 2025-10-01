export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId, quantity){
        const matchingItem = cart.find(cartItem => cartItem.productId === productId);

        if(matchingItem){
            matchingItem.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
             });
        }
        saveToStorage();
}
export function removeFromCart(productId){
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
        const matchingItem = cart.find(cartItem => cartItem.productId === productId);
        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
        }
        saveToStorage();
}
export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}