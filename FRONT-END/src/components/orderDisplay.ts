import { Menu } from "../utils/interfaces";
import { showModal } from "./modal";
import { addToCart } from "./cart";

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
                        <summary>Menu description</summary>
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
};

export { displayOrderMenu };
