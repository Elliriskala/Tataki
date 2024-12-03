import { fetchMenuItemsByCategory } from "./services/apiService";
import { displayOrderMenu } from "./components/orderDisplay";
import { updateCartDisplay } from "./components/cart";
import { placeOrder } from "./orderProcessing";

// initialize category buttons
const initializeCategoryButtons = async (): Promise<void> => {
    const categoryButtons = document.querySelectorAll(
        ".select-category-button",
    );
    categoryButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const category = button.getAttribute("data-translate") || "";
            if (category) {
                const menus = await fetchMenuItemsByCategory(category);
                displayOrderMenu(menus);
            }
        });
    });
};

// initialize order page
const initializeOrderPage = async (): Promise<void> => {
    try {
        // update cart display
        updateCartDisplay();

        const menuContainer = document.querySelector(
            ".menu-container",
        ) as HTMLDivElement | null;

        // fetch initial menus and display them
        const initialMenus = await fetchMenuItemsByCategory("lunch");
        if (menuContainer) {
            displayOrderMenu(initialMenus);
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
