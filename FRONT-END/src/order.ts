import { fetchMenuItemsByCategory } from "./services/apiService";
import { displayOrderMenu } from "./components/orderDisplay";
import { updateCartDisplay } from "./components/cart";
import { placeOrder } from "./orderProcessing";

// set the default language
const getLanguage = (): string => {
    // Default to 'en' if no language is set
    return localStorage.getItem('language') || 'en';
};

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
        console.error("Failed to initialize order page", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initializeOrderPage().catch((error) => {
        console.error("Failed to initialize order page", error);
    });

    const placeOrderButton = document.getElementById("place-order-button");
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", placeOrder);
    }
});
