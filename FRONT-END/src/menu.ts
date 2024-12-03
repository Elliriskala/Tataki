import { fetchMenuItemsByCategory } from "./services/apiService";
import { displayMenu } from "./components/menuDisplay";
import { initializeCarousel } from "./components/carousel";

// initialize category buttons
const initializeCategoryButtons = async (
  container: HTMLDivElement
): Promise<void> => {
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
  const menuTracker = document.querySelector(
    ".menu-track"
  ) as HTMLDivElement | null;
  const menuContainer = document.querySelector(
    ".menu-container"
  ) as HTMLDivElement | null;

  const initialMenus = await fetchMenuItemsByCategory("lunch");
  if (menuContainer) {
    displayMenu(initialMenus, menuContainer);
  }

  if (menuTracker && menuContainer) {
    await initializeCarousel(menuTracker);
    await initializeCategoryButtons(menuContainer);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initializeMenuPage().catch((error) => {
    console.error("Failed to initialize menu page", error);
  });
});
