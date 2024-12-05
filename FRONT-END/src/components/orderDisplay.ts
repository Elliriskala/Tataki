import { Menu } from "../utils/interfaces";
import { showModal } from "./modal";
import { addToCart } from "./cart";

// display order page menus
const displayOrderMenu = (menus: Menu[], lang: string): void => {
    const menuContainer = document.querySelector(
        ".menu-container",
    ) as HTMLDivElement | null;

    if (!menuContainer) {
        console.log("Menu container not found");
        return;
    }

    // Hide the menu container for smoother transition
    menuContainer.classList.add("hidden");

    setTimeout(() => {
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

            // get the description in the selected language
            let descriptions;
            try {
                descriptions = JSON.parse(menu.course_description);
            } catch (error) {
                console.error(
                    "Error parsing course_description for menu:",
                    error,
                );
                descriptions = {};
            }
            const description = descriptions[lang] || descriptions["en"];

            // Split the description into sentences
            const descriptionLines = description
                .split(".")
                .map((line: string) => line.trim())
                .filter((line: string) => line !== "");

            const descriptionHTML = descriptionLines
                .map((line: string) => `<p>${line}.</p>`)
                .join("");

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
                        <div class="menu-description hidden">
                            <p>${descriptionHTML}</p>
                        </div>
                        </div>
                        `;

            // add event listener to show the description when the menu item is clicked

            menuCard.addEventListener("click", () => {
                // Collapse all other descriptions
                const allCards = document.querySelectorAll(".menu-card");
                allCards.forEach((card) => {
                    if (card !== menuCard) {
                        const desc = card.querySelector(".menu-description");
                        if (desc) {
                            desc.classList.remove("visible");
                        }
                    }
                });
            
                // Toggle the current card's description
                const descriptionDiv = menuCard.querySelector(".menu-description");
                if (descriptionDiv) {
                    descriptionDiv.classList.toggle("visible");
                }
            });

            // Add item to cart button
            const addToCartButton = menuCard.querySelector(
                ".add-to-order-button",
            );
            if (addToCartButton) {
                addToCartButton.addEventListener("click", async (event) => {
                    console.log("Button clicked");
                    showModal();

                    // Get the item ID from the button's value attribute
                    const button = event.currentTarget as HTMLButtonElement;
                    const itemId = button.value;

                    // Add item to cart
                    const itemToAdd = addToCart(Number(itemId));
                    console.log(`Item added to cart with ID: ${itemToAdd}`);
                });
            }
            menuContainer.appendChild(menuCard);
        });

        menuContainer.classList.remove("hidden");

        const newMenuCards = menuContainer.querySelectorAll(".menu-card");
        newMenuCards.forEach((card) => {
            card.classList.add("visible");
        });
    }, 500);
};

export { displayOrderMenu };
