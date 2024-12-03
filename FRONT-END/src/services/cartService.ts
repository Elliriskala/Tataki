import { Menu } from "../utils/interfaces"; 

// Fetch items in the cart from local storage
const getCart = (): Menu[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// save items to cart in local storage
const saveToCart = (cart: Menu[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addItemToCart = (item: Menu): void => {
  let cart = getCart();
  cart.push(item);
  saveToCart(cart);
};

export { addItemToCart, getCart, saveToCart };
