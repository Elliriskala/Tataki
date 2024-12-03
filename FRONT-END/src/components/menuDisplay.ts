import { Menu } from "../utils/interfaces";
import { showModal } from "../components/modal";
import { addToCart } from "../components/cart";

// creating the menu display
export const displayMenu = (menus: Menu[], container: HTMLDivElement): void => {
  container.innerHTML = "";

  menus.forEach((menu) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");

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
          <h3 class="menu-header">${menu.course_name}</h3>
          <p>${menu.course_description}</p>
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
    const addToCartButton = menuCard.querySelector(".add-to-order-button");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", async (event) => {
        showModal();

        // Get the item ID from the button's value attribute
        const button = event.currentTarget as HTMLButtonElement;
        const itemId = button.value;

        // add the item to the cart
        const itemToAdd = addToCart(Number(itemId));
        console.log(`Item added to cart with ID: ${itemToAdd}`);
      });
    }
    container.appendChild(menuCard);
  });
};
