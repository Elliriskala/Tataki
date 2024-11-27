"use strict";
import { Menu } from "./utils/interfaces";

// Fetching the menu items from the database

const fetchMenuItems = async (): Promise<Menu[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/menus", {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to fetch menu items:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();
    
    const menudata: Menu[] = JSON.parse(responseText);
    return menudata;
  } catch (error) {
    console.error("fetchMenuItems error:", error);
    throw new Error("Failed to fetch menu items");
  }
};

// Fetching the menu items from the database based on the category

const fetchMenuItemsByCategory = async (category: string): Promise<Menu[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/menus/${category}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to fetch menu items:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();

    const menudata: Menu[] = JSON.parse(responseText);
    return menudata;
  } catch (error) {
    console.error("fetchMenuItemsByCategory error:", error);
    throw new Error("Failed to fetch menu items by category");
  }
};

// fetch special menus from the database

const fetchSpecialMenus = async (): Promise<Menu[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/menus/specials", {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to fetch special menu items:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();

    const menudata: Menu[] = JSON.parse(responseText);
    return menudata;
  } catch (error) {

    console.error("fetchSpecialMenus error:", error);
    throw new Error("Failed to fetch special menu items");
  }
};

// Creating the menus to display

const displayMenu = (menus: Menu[]): void => {
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
                            <div class="image-placeholder">
                                    <div class="menu-image" style="background-image: url('${menu.menu_image}')"></div>
                            </div>
                            <div>
                                    <h3 class="menu-header">${menu.course_name}</h3>
                                    <p>${menu.course_description}</p>
                                    <p class="price">${menu.price}€</p>
                                    <p class="allergen-info">Allergens: ${allergens}</p>
                            </div>
                    </div>
                    `;
    menuContainer.appendChild(menuCard);
  });
};

// selecting the menus to display based on the button clicked

const selectMenuToDisplay = () => {
  fetchMenuItemsByCategory("lunch").then(displayMenu);

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

  lunchButton.addEventListener("click", async () => {
    const lunchMenus = await fetchMenuItemsByCategory("lunch");
    displayMenu(lunchMenus);
    console.log("lunch button clicked");
  });

  dinnerButton.addEventListener("click", async () => {
    const dinnerMenus = await fetchMenuItemsByCategory("dinner");
    displayMenu(dinnerMenus);
  });

  sideButton.addEventListener("click", async () => {
    const sideMenus = await fetchMenuItemsByCategory("sides");
    displayMenu(sideMenus);
  });

  drinkButton.addEventListener("click", async () => {
    const drinkMenus = await fetchMenuItemsByCategory("drinks");
    displayMenu(drinkMenus);
  });

  dessertButton.addEventListener("click", async () => {
    const dessertMenus = await fetchMenuItemsByCategory("desserts");
    displayMenu(dessertMenus);
  });
};

// select chef's specials to display

const selectSpecialsToDisplay = () => {
  fetchSpecialMenus().then(displayMenu);
};

export { displayMenu, selectMenuToDisplay, fetchMenuItemsByCategory };
