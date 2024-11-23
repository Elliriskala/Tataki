'use strict';

import { lunchMenus, dinnerMenus, sideMenus, drinkMenus, dessertMenus } from "./menuItems";
import { MenuItems } from "./types";

// Creating the menus to display 

const displayMenu = (menus: MenuItems[]): void => {
    const menuContainer = document.querySelector(".menu-container") as HTMLDivElement | null;

    if (!menuContainer) {
        console.log("Menu container not found");
        return;
    }

    menuContainer.innerHTML = "";

    menus.forEach((menu: MenuItems) => {
        const menuCard = document.createElement("div");
        menuCard.classList.add("menu-card");
        menuCard.innerHTML = `
                    <div class="menu-placeholder">
                            <div class="image-placeholder">
                                    <div class="menu-image" style="background-image: url('${menu.menuImage}')"></div>
                            </div>
                            <div>
                                    <h3 class="menu-header">${menu.menuName}</h3>
                                    <p>${menu.menuDescription}</p>
                                    <p class="price">${menu.price}</p>
                                    <p class="allergen-info">Allergens: ${menu.allergens}</p>
                            </div>
                    </div>
                    `;
        menuContainer.appendChild(menuCard);
    });
};
  
  // selecting the menus to display based on the button clicked
  
  const selectMenuToDisplay = () => {
    const lunchButton = document.querySelector(".lunch-button");
    const dinnerButton = document.querySelector(".dinner-button");
    const sideButton = document.querySelector(".sides-button");
    const drinkButton = document.querySelector(".drinks-button");
    const dessertButton = document.querySelector(".desserts-button");
  
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
  
    lunchButton.addEventListener("click", () => {
      displayMenu(lunchMenus);
    });
  
    dinnerButton.addEventListener("click", () => {
      displayMenu(dinnerMenus);
    });
  
    sideButton.addEventListener("click", () => {
      displayMenu(sideMenus);
    });
  
    drinkButton.addEventListener("click", () => {
      displayMenu(drinkMenus);
    });
  
    dessertButton.addEventListener("click", () => {
      displayMenu(dessertMenus);
    });
  };
  
  selectMenuToDisplay(); // selecting different menu
  displayMenu(lunchMenus); // Default menu

  export { displayMenu, selectMenuToDisplay };