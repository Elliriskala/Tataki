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
    const response = await fetch(
      `http://localhost:3000/api/menus/category/${category}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch menu items:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("fetchMenuItemsByCategory error:", error);
    throw new Error("Failed to fetch menu items by category");
  }
};

// fetch special menus from the database

const fetchSpecialMenus = async (): Promise<Menu[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/menus/specials/1", {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to fetch special menu items:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("fetchSpecialMenus error:", error);
    throw new Error("Failed to fetch special menu items");
  }
};

// Creating the menus to display

const displayMenu = (menus: Menu[], container: HTMLDivElement): void => {
  container.innerHTML = "";

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
    container.appendChild(menuCard);
  });
};

// display the special menus in the carousel 

const initializeCarousel = async (menuTracker: HTMLDivElement): Promise<void> => {
  try {
    const specialMenus = await fetchSpecialMenus();
    displayMenu(specialMenus, menuTracker);

    let menuPosition = 0; // initial position
    const menuItems = document.querySelectorAll(".menu-card");
    const menuWidth = menuItems[0]?.clientWidth || 0;

    const updateCarousel = () => {
      menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;
      (document.querySelector("#carousel-left") as HTMLButtonElement)!.disabled = menuPosition === 0;
      (document.querySelector("#carousel-right") as HTMLButtonElement)!.disabled =
        menuPosition >= specialMenus.length - 1;
    };

    const leftArrow = document.querySelector(
      "#carousel-left"
    ) as HTMLButtonElement | null;
    const rightArrow = document.querySelector(
      "#carousel-right"
    ) as HTMLButtonElement | null;

    // scroll menu to the left
    if (leftArrow) {
      leftArrow.addEventListener("click", () => {
        if (menuPosition > 0) {
          menuPosition -= 1;
          updateCarousel();
        }
      });
    }

    // scroll menu to the right
    if (rightArrow) {
      rightArrow.addEventListener("click", () => {
        if (menuPosition < specialMenus.length - 1) menuPosition += 1;
          updateCarousel();
      });
    }

    updateCarousel();
  } catch (error) {
    console.error("initializeCarousel error:", error);
    throw new Error("Failed to initialize carousel");
  }
};

// initialize category buttons
const initializeCategoryButtons = async (container: HTMLDivElement): Promise<void> => {
  const categoryButtons = document.querySelectorAll(".select-category-button");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const category = button.getAttribute("data-translate") || "";
      if (category) {
        const menus = await fetchMenuItemsByCategory(category);
        displayMenu(menus, container);
      }
    });
  });
};

// initialize menu page
const initializeMenuPage = async (): Promise<void> => {
  const menuTracker = document.querySelector(".menu-track") as HTMLDivElement | null;
  const menuContainer = document.querySelector(".menu-container") as HTMLDivElement | null;

  if (menuTracker && menuContainer) {
    await initializeCarousel(menuTracker);
    await initializeCategoryButtons(menuContainer);
  }
};

document.addEventListener("DOMContentLoaded", initializeMenuPage);

export {
  displayMenu,
  fetchMenuItemsByCategory,
  fetchMenuItems,
  fetchSpecialMenus,
  initializeMenuPage
};
