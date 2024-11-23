'use strict';
const addToCart = document.querySelectorAll('.select-item-checkbox');
const addMoreToCart = document.querySelector('.add-checkbox');
const removeFromCart = document.querySelector('.remove-checkbox');
// on click add to cart
for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', () => {
        console.log('Item added to cart');
    });
}
// on click add more to cart
addMoreToCart.addEventListener('click', () => {
    console.log('Item added to cart');
});
// on click remove from cart
removeFromCart.addEventListener('click', () => {
    console.log('Item removed from cart');
});
//# sourceMappingURL=order.js.map