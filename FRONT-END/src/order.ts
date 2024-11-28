import { fetchMenuItemsByCategory } from "./menu";
import { Menu } from "./utils/interfaces";

// Fetch items in the cart from local storage

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart;
};

// save itrems to cart in local storage

const saveToCart = (cart: any) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// display order page menus
const displayOrderMenu = (menus: Menu[]): void => {
  const menuContainer = document.querySelector(
    ".menu-container"
  ) as HTMLDivElement | null;

  if (!menuContainer) {
    console.log("Menu container not found");
    return;
  }

  menuContainer.innerHTML = "";

  menus.forEach((menu: Menu) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");

    // display allergen information for each menu item, if exists

    const allergens =
      menu.allergens && menu.allergens.length > 0
        ? menu.allergens
            .map((allergen) => allergen.allergen_description)
            .join(", ")
        : "No allergens"; // Default if no allergens are available

    // display the menu items
    menuCard.innerHTML = `
                    <div class="menu-placeholder">
                        <div class="menu-item">
                            <div class="image-placeholder">
                                <div class="menu-image" style="background-image: url('${menu.menu_image}')"></div>
                            </div>
                            <div class="menu-item-info">
                                <h3 class="menu-header">${menu.course_name}</h3>
                                <p class="price">${menu.price}€</p>
                                <p class="allergen-info">Allergens: ${allergens}</p>
                            </div>
                            <button class="add-to-order-button" value="${menu.menu_id}"><i class="fa-solid fa-cart-plus"></i>
                            <span class="tooltip">Add to cart</span>
                            </button>
                        </div>
                        <div class="menu-description">
                            <details>
                              <summmary>Menu description</summary>
                              <div class="content" style="max-height: 400px;">${menu.course_description}</div>
                            </details>
                        </div>
                    </div>
                    `;

    // Add item to cart button
    const addToCartButton = menuCard.querySelector(".add-to-order-button");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", async (event) => {
        console.log("Button clicked");

        // Get the item ID from the button's value attribute
        const button = event.currentTarget as HTMLButtonElement;
        const itemId = button.value;
        console.log(`Item added to cart with ID: ${itemId}`);

        // Fetch item details
        const itemDetails = await fetchItemDetails(Number(itemId));
        if (!itemDetails) {
          console.error("Failed to fetch item details");
          return;
        } else {
          console.log("Item details:", itemDetails);

          // Get the cart from localStorage
          let cart = getCart();

          // Check if the item already exists in the cart
          const existingItem = cart.find(
            (item: any) => item.menuId === itemDetails.menu_id
          );

          if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if item exists
          } else {
            // Add new item to cart
            cart.push({
              menuId: itemDetails.menu_id,
              name: itemDetails.course_name,
              price: itemDetails.price,
              quantity: 1,
            });
          }

          saveToCart(cart);
          updateCartDisplay();
        }
      });
    }
    menuContainer.appendChild(menuCard);
  });
};

// fetch item details from database (name, price)
const fetchItemDetails = async (itemId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/menus/${itemId}`);

    const rawResponse = await response.text();
    console.log("Raw response:", rawResponse);

    if (!response.ok) {
      throw new Error(`Error fetching item details: ${response.statusText}`);
    }

    const itemArray = JSON.parse(rawResponse);

    if (!itemArray || itemArray.length === 0) {
      console.error("Item not found");
      return null;
    }

    const item = itemArray[0];
    console.log("Parsed item:", item);
    return item;
  } catch (error) {
    console.error("fetchItemDetails error:", error);
    throw new Error("Failed to fetch item details");
  }
};

const lunchButton = document.querySelector(".lunch-button");
const dinnerButton = document.querySelector(".dinner-button");
const sideButton = document.querySelector(".sides-button");
const drinkButton = document.querySelector(".drinks-button");
const dessertButton = document.querySelector(".desserts-button");

// selecting order menus to display

const selectOrderMenuToDisplay = () => {
  fetchMenuItemsByCategory("lunch").then(displayOrderMenu);

  if (
    !lunchButton ||
    !dinnerButton ||
    !sideButton ||
    !drinkButton ||
    !dessertButton
  ) {
    console.log("Buttons not found");
    return;
  }

  lunchButton.addEventListener("click", async () => {
    const lunchMenus = await fetchMenuItemsByCategory("lunch");
    displayOrderMenu(lunchMenus);
    console.log("lunch button clicked");
  });

  dinnerButton.addEventListener("click", async () => {
    const dinnerMenus = await fetchMenuItemsByCategory("dinner");
    displayOrderMenu(dinnerMenus);
  });

  sideButton.addEventListener("click", async () => {
    const sideMenus = await fetchMenuItemsByCategory("sides");
    displayOrderMenu(sideMenus);
  });

  drinkButton.addEventListener("click", async () => {
    const drinkMenus = await fetchMenuItemsByCategory("drinks");
    displayOrderMenu(drinkMenus);
  });

  dessertButton.addEventListener("click", async () => {
    const dessertMenus = await fetchMenuItemsByCategory("desserts");
    displayOrderMenu(dessertMenus);
  });
};

// update cart display
const updateCartDisplay = () => {
  const cart = getCart();
  console.log("Cart:", cart);

  const cartContainer = document.getElementById("cart-items");

  // clear the cart container
  if (cartContainer) {
    cartContainer.innerHTML = "";
  }

  cart.forEach((item: any, index: number) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}€</td>
      <td>
        <div class="qty-checkbox">
          <input type="checkbox" class="remove-checkbox" id="remove-checkbox-${index}" />
          <label for="remove-checkbox-${index}"><i class="fa-solid fa-minus"></i></label>
          <p>${item.quantity}</p>
          <input type="checkbox" class="add-checkbox" id="add-checkbox-${index}" />
          <label for="add-checkbox-${index}"><i class="fa-solid fa-plus"></i></label>
        </div>
      </td>
    `;

    row
      .querySelector(`#remove-checkbox-${index}`)
      ?.addEventListener("click", () => {
        removeFromCart(index, false); // remove one item
      });
    row
      .querySelector(`#add-checkbox-${index}`)
      ?.addEventListener("click", () => {
        addMoreToCart(index); // add one item
      });

    if (cartContainer) {
      cartContainer.appendChild(row);
    }
  });

  // display total price
  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * item.quantity,
    0
  );

  const totalPriceElement = document.getElementById(
    "total-price"
  ) as HTMLDivElement | null;
  if (totalPriceElement) {
    totalPriceElement.innerHTML = `Total: €${totalPrice.toFixed(2)}`;
  }
};

// remove items from cart

const removeFromCart = (index: number, removeAll: false) => {
  let cart = getCart();
  const item = cart[index];
  if (removeAll) {
    cart.splice(index, 1); // remove the item
  } else if (item.quantity > 1) {
    item.quantity -= 1; // decrement quantity if more than 1
  } else {
    cart.splice(index, 1); // remove the item if quantity is 1
  }

  saveToCart(cart);
  updateCartDisplay();
};

// add more items to cart

const addMoreToCart = (index: number) => {
  let cart = getCart();
  cart[index].quantity += 1; // increment quantity
  saveToCart(cart);
  updateCartDisplay();
};

// place the order

const placeOrder = async () => {
  try {
    const orderData = collectOrderData();
    console.log("Order data:", orderData);
   
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: orderData }),
    });

    if (!response.ok) {
      throw new Error(`Error placing order: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Order placed successfully! Order ID: ${result.orderId}`);

    // clearing the cart after placing the order
    localStorage.removeItem("cart");
    updateCartDisplay();
  } catch (error) {
    console.error("Error placing order:", error);
    console.log("There was an issue placing your order. Please try again.");
  }
};

// collect the order details
const collectOrderData = () => {
  // Get cart items
  const cartItems: { name: string; price: number; quantity: number }[] = [];
  const cartRows = document.querySelectorAll("#cart-items tr");
  cartRows.forEach((row) => {
    const nameElement = row.querySelector("td:nth-child(1)");
    const name = nameElement ? nameElement.textContent?.trim() || "" : "";
    const priceElement = row.querySelector("td:nth-child(2)");
    const price = priceElement ? parseFloat(priceElement.textContent?.trim().replace('€', '') || '0') : 0;
    const quantityElement = row.querySelector("td:nth-child(3)");
    const quantity = quantityElement ? parseInt(quantityElement.textContent?.trim() || '0') : 0;
    
    cartItems.push({ name, price, quantity });
  });

  // Get customer information
  const customerInfo = {
    name: (document.querySelector(".order-user-info input[placeholder='Name']") as HTMLInputElement)?.value.trim() || "",
    phone: (document.querySelector(".order-user-info input[placeholder='Phone number']") as HTMLInputElement)?.value.trim() || "",
    email: (document.querySelector(".order-user-info input[placeholder='Email']") as HTMLInputElement)?.value.trim() || "",
    address: (document.querySelector(".order-user-info input[placeholder='Address']") as HTMLInputElement)?.value.trim() || "",
    postalCode: (document.querySelector(".order-user-info input[placeholder='Postal code']") as HTMLInputElement)?.value.trim() || "",
  };

  // Check delivery method
  const deliveryCheckbox = document.getElementById("delivery-checkbox") as HTMLInputElement | null;
  const isDelivery = deliveryCheckbox ? deliveryCheckbox.checked : false;
  const pickupCheckbox = document.getElementById("pickup-checkbox") as HTMLInputElement | null;
  const isPickup = pickupCheckbox ? pickupCheckbox.checked : false;

  let deliveryMethod = null;
  if (isDelivery && !isPickup) {
    deliveryMethod = "delivery";
  } else if (!isDelivery && isPickup) {
    deliveryMethod = "pickup";
  } else {
    throw new Error("Please select either Delivery or Pickup, but not both.");
  }

  // Get comments
  const additionalCommentElement = document.getElementById("leave-comment");
  const additionalComment = additionalCommentElement ? (additionalCommentElement as HTMLTextAreaElement).value.trim() : "";
  const deliveryInstructionsElement = document.getElementById("instructions");
  const deliveryInstructions = deliveryInstructionsElement ? (deliveryInstructionsElement as HTMLTextAreaElement).value.trim() : "";

  // Check terms and conditions
  const termsCheckbox = document.getElementById("terms-checkbox") as HTMLInputElement | null;
  const hasAgreedToTerms = termsCheckbox ? termsCheckbox.checked : false;
  if (!hasAgreedToTerms) {
    throw new Error("You must agree to the Terms and Conditions to place an order.");
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Return the collected data
  return {
    customer_mame: customerInfo.name,
    customerInfo,
    cartItems,
    deliveryMethod,
    additionalComment,
    deliveryInstructions,
    totalPrice,
  };
};

// Event listener for delivery method checkboxes
const deliveryCheckbox = document.getElementById("delivery-checkbox");
const pickupCheckbox = document.getElementById("pickup-checkbox");

if (deliveryCheckbox) {
  deliveryCheckbox.addEventListener("change", () => {
    if ((deliveryCheckbox as HTMLInputElement).checked) {
      if (pickupCheckbox) {
        (pickupCheckbox as HTMLInputElement).checked = false;
      }
    }
  });
}

if (pickupCheckbox) {
  pickupCheckbox.addEventListener("change", () => {
    if ((pickupCheckbox as HTMLInputElement).checked) {
      if (deliveryCheckbox) {
        (deliveryCheckbox as HTMLInputElement).checked = false;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");

  selectOrderMenuToDisplay();
  updateCartDisplay();

  const placeOrderButton = document.getElementById("place-order-button");
  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", placeOrder);
  }
});
