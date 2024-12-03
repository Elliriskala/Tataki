import { displayMenu } from "../components/menuDisplay";
import { fetchSpecialMenus } from "../services/apiService";

// display the special menus in the carousel
export const initializeCarousel = async (
  menuTracker: HTMLDivElement
): Promise<void> => {
  try {
    const specialMenus = await fetchSpecialMenus();
    displayMenu(specialMenus, menuTracker);

    let menuPosition = 0;
    const menuItems = document.querySelectorAll(".menu-card");
    const menuWidth = menuItems[0]?.clientWidth || 0;

    const updateCarousel = () => {
      menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;
      (document.querySelector("#carousel-left") as HTMLButtonElement).disabled =
        menuPosition === 0;
      (
        document.querySelector("#carousel-right") as HTMLButtonElement
      ).disabled = menuPosition >= specialMenus.length - 1;
    };

    const leftArrow = document.querySelector(
      "#carousel-left"
    ) as HTMLButtonElement;
    const rightArrow = document.querySelector(
      "#carousel-right"
    ) as HTMLButtonElement;

    // scroll menu to the left
    if (leftArrow) {
      leftArrow.addEventListener("click", () => {
        if (menuPosition > 0) menuPosition -= 1;
        updateCarousel();
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
    console.error("Error initializing carousel:", error);
  }
};
