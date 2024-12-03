import { getCart, saveToCart } from "../services/cartService";
import { fetchItemDetails } from "../services/apiService";

export const updateCartDisplay = (): void => {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = ""; // Clear the cart

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${item.course_name}</td>
      <td>${item.price}€</td>
      <td>
        <div class="quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </td>
    `;

        // Decrease quantity event listener
        row.querySelector(".decrease")?.addEventListener("click", () => {
            decreaseQuantity(index);
        });

        // Increase quantity event listener
        row.querySelector(".increase")?.addEventListener("click", () => {
            increaseQuantity(index);
        });

        cartContainer.appendChild(row);

        const totalPriceElement = document.getElementById("total-price") as HTMLSpanElement;
        const totalPrice = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );

        if (totalPriceElement)
            totalPriceElement.innerText = `${totalPrice.toFixed(2)}€`;
        console.log(totalPrice.toFixed(2));
        console.log("Script Loaded");
        console.log("Total Price:", totalPrice);
        console.log("Total Price Element:", totalPriceElement);
    });
};

// add an item to cart
export const addToCart = (menuId: number): void => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.menu_id === menuId);
    if (existingItem) {
        existingItem.quantity += 1;
        saveToCart(cart);
        updateCartDisplay();
    } else {
        // fetch item details
        fetchItemDetails(menuId).then((itemDetails) => {
            if (!itemDetails) return;

            cart.push({
                menu_id: itemDetails.menu_id,
                course_name: itemDetails.course_name,
                price: itemDetails.price,
                quantity: 1,
                course_description: itemDetails.course_description,
                menu_image: itemDetails.menu_image,
                category: itemDetails.category,
            });

            console.log(cart);
            saveToCart(cart);
            updateCartDisplay();
        });
    }
};

// decrease quantity of an item
const decreaseQuantity = (index: number): void => {
    let cart = getCart();
    const item = cart[index];

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1); // Remove the item completely
    }

    saveToCart(cart);
    updateCartDisplay();
};

// increase quantity of an item
const increaseQuantity = (index: number): void => {
    let cart = getCart();
    cart[index].quantity += 1;
    saveToCart(cart);
    updateCartDisplay();
};

// checking and updating the delivery method

const checkDeliveryMethod = async (): Promise<void> => {
    const deliveryCheckbox = document.getElementById(
        "delivery-checkbox",
    ) as HTMLInputElement;
    const pickupCheckbox = document.getElementById(
        "pickup-checkbox",
    ) as HTMLInputElement;

    const handleCheckboxChange = (
        checkboxChanged: HTMLInputElement,
        otherCheckbox: HTMLInputElement,
    ) => {
        if (checkboxChanged.checked) {
            otherCheckbox.checked = false;
        }
    };

    deliveryCheckbox?.addEventListener("change", () => {
        handleCheckboxChange(deliveryCheckbox, pickupCheckbox);
    });

    pickupCheckbox?.addEventListener("change", () => {
        handleCheckboxChange(pickupCheckbox, deliveryCheckbox);
    });

    const isDelivery = deliveryCheckbox ? deliveryCheckbox.checked : false;

    if (isDelivery) {
        const addressInput = document.querySelector(
            ".order-user-info input[placeholder='Address']",
        ) as HTMLInputElement;
        const postalCodeInput = document.querySelector(
            ".order-user-info input[placeholder='Postal code']",
        ) as HTMLInputElement;

        if (addressInput && postalCodeInput) {
            addressInput.required = true;
            postalCodeInput.required = true;

            if (!addressInput.value.trim()) {
                throw new Error(
                    "Delivery address is required for delivery orders.",
                );
            }

            if (!postalCodeInput.value.trim()) {
                throw new Error("Postal code is required for delivery orders.");
            }
        }
    } else {
        const addressInput = document.querySelector(
            ".order-user-info input[placeholder='Address']",
        ) as HTMLInputElement;
        const postalCodeInput = document.querySelector(
            ".order-user-info input[placeholder='Postal code']",
        ) as HTMLInputElement;

        if (addressInput && postalCodeInput) {
            addressInput.required = false;
            postalCodeInput.required = false;
        }
    }
};

export { checkDeliveryMethod };
