import { fetchMenuItemsByCategory } from "./services/apiService";
import { displayOrderMenu } from "./components/orderDisplay";
import { updateCartDisplay, checkDeliveryMethod, existingInfoButton } from "./components/cart";
import { placeOrder } from "./orderProcessing";
import { getLanguage } from "./utils/functions";
import { logError } from "./utils/functions";

const popup = document.getElementById("success-popup") as HTMLDivElement;
const popupMessage = document.getElementById(
    "popup-message",
) as HTMLParagraphElement;
const closePopup = document.getElementById("close-popup") as HTMLButtonElement;

// initialize category buttons
const initializeCategoryButtons = async (): Promise<void> => {
    const lang = getLanguage();
    const categoryButtons = document.querySelectorAll(
        ".select-category-button",
    );
    categoryButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const category = button.getAttribute("data-translate") || "";
            if (category) {
                const menus = await fetchMenuItemsByCategory(category);
                displayOrderMenu(menus, lang);
            }
        });
    });
};

// initialize order page
const initializeOrderPage = async (): Promise<void> => {
    try {
        const lang = getLanguage();
        // update cart display
        updateCartDisplay();

        // check if delivery method is set
        checkDeliveryMethod()

        // check if existing info button is clicked
        existingInfoButton();

        const menuContainer = document.querySelector(
            ".menu-container",
        ) as HTMLDivElement | null;

        // fetch initial menus and display them
        const initialMenus = await fetchMenuItemsByCategory("lunch");
        if (menuContainer) {
            displayOrderMenu(initialMenus, lang);
            await initializeCategoryButtons();
        }
    } catch (error) {
        throw new Error("Failed to initialize order page");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initializeOrderPage().catch((error) => {
        logError(error, "initializeOrderPage");
    });

    const placeOrderButton = document.getElementById("place-order-button");
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", placeOrder);
    }
});
