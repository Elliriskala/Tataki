import { Menu } from "../utils/interfaces";
import { showModal } from "../components/modal";
import { addToCart } from "../components/cart";

// creating the menu display
export const displayMenu = (
    menus: Menu[],
    container: HTMLDivElement,
    language: string,
): void => {
    container.classList.add("hidden");

    setTimeout(() => {
        container.innerHTML = "";

        menus.forEach((menu) => {
            const menuCard = document.createElement("div");
            menuCard.classList.add("menu-card");

            // get the description in the selected language
            let descriptions;
            try {
                descriptions = JSON.parse(menu.course_description);
            } catch (error) {
                descriptions = {};
            }

            const description = descriptions[language] || descriptions["en"];

            // Split the description into sentences
            const descriptionLines = description
                .split(".")
                .map((line: string) => line.trim())
                .filter((line: string) => line !== "");

            const descriptionHTML = descriptionLines
                .map((line: string) => `<p>${line}.</p>`)
                .join("");

            // display allergen information for each menu item, if exists
            const allergens = menu.allergens?.length
                ? menu.allergens.map((a) => a.allergen_description).join(", ")
                : "No allergens";

            // display the menu items
            menuCard.innerHTML = `
        <div class="menu-placeholder">
            <div class="image-placeholder">
            <div class="menu-image" style="background-image: url('${menu.menu_image}')"></div>
            </div>
            <div>
            <h2 class="menu-header">${menu.course_name}</h2>
            <p>${descriptionHTML}</p>
            <p class="price">${menu.price}€</p>
            <p class="allergen-info">Allergens: ${allergens}</p>
            <button class="add-to-order-button" value="${menu.menu_id}">
                <i class="fa-solid fa-cart-plus"></i>
                <span class="tooltip">Add to cart</span>
            </button>
            </div>
        </div>
        `;

            // adding an item to cart
            const addToCartButton = menuCard.querySelector(
                ".add-to-order-button",
            );

            addToCartButton?.setAttribute("aria-label", "Add to cart");
            
            if (addToCartButton) {
                addToCartButton.addEventListener("click", async (event) => {
                    showModal();

                    // Get the item ID from the button's value attribute
                    const button = event.currentTarget as HTMLButtonElement;
                    const itemId = button.value;

                    // add the item to the cart
                    addToCart(Number(itemId));
                });
            }
            container.appendChild(menuCard);
        });

        container.classList.remove("hidden");

        // show the menu cards
        const newMenuCards = container.querySelectorAll(".menu-card");
        newMenuCards.forEach((card) => {
            card.classList.add("visible");
        });
    }, 500);
};
