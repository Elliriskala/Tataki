import { getCart, saveToCart } from "../services/cartService";
import { fetchItemDetails, fetchUserInfo } from "../services/apiService";

export const updateCartDisplay = (): void => {
    const cart = getCart();
    console.log("Cart:", cart);
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById(
        "total-price",
    ) as HTMLSpanElement;

    if (!cartContainer || !totalPriceElement) return;

    cartContainer.innerHTML = ""; // Clear the cart

    // Create a row for each item in the cart
    cart.forEach((item, index) => {
        const row = createCartItemRow(item, index);
        cartContainer.appendChild(row);
    });

    // Update the total price
    updateTotalPrice(cart, totalPriceElement);
};

// create a row for a cart item
const createCartItemRow = (item: any, index: number): HTMLTableRowElement => {
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

    // add event listeners for quantity change
    row
        .querySelector(".decrease")
        ?.addEventListener("click", () => decreaseQuantity(index));
    row
        .querySelector(".increase")
        ?.addEventListener("click", () => increaseQuantity(index));

    return row;
};

// function to add user info on button click if the user is logged in
export const existingInfoButton = (): void => {
    const useExistingInfoButton = document.getElementById(
        "use-existing-info-button",
    ) as HTMLButtonElement;

    if (!useExistingInfoButton) {
        console.error("Button with ID 'use-existing-info-button' not found!");
    }

    useExistingInfoButton.addEventListener("click", async () => {
        try {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                populateUserInfo(userInfo);
            } else {
                console.log(
                    "No saved information found. Please fill in your details manually.",
                );
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            console.log("Failed to load saved information.");
        }
    });
};

// function to populate user info in the form
const populateUserInfo = (userInfo: any): void => {
    const nameInput = document.querySelector(
        'input[data-translate="placeholder-name"]',
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
        'input[data-translate="placeholder-email"]',
    ) as HTMLInputElement;
    const phoneInput = document.querySelector(
        'input[data-translate="placeholder-phone"]',
    ) as HTMLInputElement;

    const addressInput = document.querySelector(
        'input[data-translate="placeholder-address"]',
    ) as HTMLInputElement;

    const cityInput = document.querySelector(
        'input[data-translate="placeholder-city"]',
    ) as HTMLInputElement;

    if (nameInput && emailInput && phoneInput) {
        nameInput.value = userInfo.name || "";
        emailInput.value = userInfo.email || "";
        phoneInput.value = userInfo.phone || "";
        addressInput.value = userInfo.address || "";
        cityInput.value = userInfo.city || "";
    }
};

// update the total price of the cart
const updateTotalPrice = (
    cart: any[],
    totalPriceElement: HTMLSpanElement,
): void => {
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    totalPriceElement.textContent =
        cart.length === 0 ? "0€" : `${totalPrice.toFixed(2)}€`;
};

// add an item to cart
export const addToCart = (menu_id: number): void => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.menu_id === menu_id);

    if (existingItem) {
        existingItem.quantity += 1;
        saveToCart(cart);
        updateCartDisplay();
    } else {
        // fetch item details
        fetchItemDetails(menu_id).then((itemDetails) => {
            if (itemDetails) {
                cart.push({
                    menu_id: itemDetails.menu_id,
                    course_name: itemDetails.course_name,
                    price: itemDetails.price,
                    quantity: 1,
                    course_description: itemDetails.course_description,
                    menu_image: itemDetails.menu_image,
                    category: itemDetails.category,
                });

                saveToCart(cart);
                updateCartDisplay();
            }
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
        cart.splice(index, 1); // remove the item completely
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

    const addressInput = document.querySelector(
        'input[data-translate="placeholder-address"]',
    ) as HTMLInputElement;
    const cityInput = document.querySelector(
        'input[data-translate="placeholder-city"]',
    ) as HTMLInputElement;

    const handleDeliveryChecked = () => {
        toggleInputFields(true, addressInput, cityInput);
        if (deliveryCheckbox.checked) pickupCheckbox.checked = false;
    };

    const handlePickupChecked = () => {
        toggleInputFields(false, addressInput, cityInput);
        if (pickupCheckbox.checked) deliveryCheckbox.checked = false;
    };

    deliveryCheckbox.addEventListener("change", handleDeliveryChecked);
    pickupCheckbox.addEventListener("change", handlePickupChecked);

    // initialize the delivery method
    handleDeliveryChecked();
    handlePickupChecked();
};

// function to toggle input fields

const toggleInputFields = (
    isDelivery: boolean,
    addressInput: HTMLInputElement,
    cityInput: HTMLInputElement,
): void => {
    if (isDelivery) {
        addressInput.setAttribute("required", "true");
        cityInput.setAttribute("required", "true");
        addInputValidationListeners(addressInput, cityInput);
    } else {
        addressInput.removeAttribute("required");
        cityInput.removeAttribute("required");
        resetInputFields(addressInput, cityInput);
    }
};

// reset the imput fields validation state
const resetInputFields = (
    addressInput: HTMLInputElement,
    cityInput: HTMLInputElement,
): void => {
    addressInput.classList.remove("invalid");
    cityInput.classList.remove("invalid");
};

// add input validation listeners
const addInputValidationListeners = (
    addressInput: HTMLInputElement,
    cityInput: HTMLInputElement,
): void => {
    addressInput.addEventListener("input", validateFields);
    cityInput.addEventListener("input", validateFields);
};

// validate the input fields
const validateFields = (): void => {
    const addressInput = document.querySelector(
        'input[data-translate="placeholder-address"]',
    ) as HTMLInputElement;
    const cityInput = document.querySelector(
        'input[data-translate="placeholder-city"]',
    ) as HTMLInputElement;

    toggleInputValidation(addressInput);
    toggleInputValidation(cityInput);
};

// toggle input validation
const toggleInputValidation = (input: HTMLInputElement): void => {
    if (input.value.trim() === "") {
        input.classList.add("invalid");
    } else {
        input.classList.remove("invalid");
    }
};

export { checkDeliveryMethod };