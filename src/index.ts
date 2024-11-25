"use strict";

import { fetchMenuItemsByCategory, selectMenuToDisplay } from "./menu";

document.addEventListener("DOMContentLoaded", () => {
  const menuTracker = document.querySelector(
    ".menu-track"
  ) as HTMLDivElement | null;
  const leftArrow = document.querySelector(
    "#carousel-left"
  ) as HTMLButtonElement | null;
  const rightArrow = document.querySelector(
    "#carousel-right"
  ) as HTMLButtonElement | null;

  if (!menuTracker || !leftArrow || !rightArrow) {
    console.log("Menu tracker or arrows not found");
    return;
  }

  let menuPosition = 0; // initial position

  const menuLength = 6;
  const container = menuTracker.parentElement as HTMLDivElement;

  // calculate the width of each menu
  const calculateMenuWidth = () => {
    const menuItems = document.querySelectorAll(".menu-card");
    if (menuItems.length > 0) {
      const menuStyle = window.getComputedStyle(menuItems[0]);
      const menuWidth = (menuItems[0] as HTMLElement).offsetWidth || 0;
      const marginRight = parseInt(menuStyle.marginRight || "0", 10);
      return menuWidth + marginRight;
    } else {
      console.log("Menu items not found");
      return undefined;
    }
  };

  // calculate the number of visible menus
  const calculateVisibleMenus = () => {
    const containerWidth = container.offsetWidth;
    const menuWidth = calculateMenuWidth();
    return menuWidth ? Math.floor(containerWidth / menuWidth) : 0;
  };

  // function to update the menu positions
  const updateCarousel = () => {
    const menuWidth = calculateMenuWidth();
    if (menuWidth !== undefined) {
      menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;
    }

    rightArrow.disabled = menuPosition >= menuLength - calculateVisibleMenus();

    leftArrow.disabled = menuPosition <= 0;
  };

  // scroll menu to the left
  leftArrow.addEventListener("click", () => {
    if (menuPosition > 0) {
      menuPosition -= 1;
      updateCarousel();
    }
  });

  // scroll menu to the right
  rightArrow.addEventListener("click", () => {
    if (menuPosition < menuLength - calculateVisibleMenus()) {
      menuPosition += 1;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    const visibleMenus = calculateVisibleMenus();
    menuPosition = Math.min(menuPosition, menuLength - visibleMenus);
    updateCarousel();
  });

  selectMenuToDisplay(); // selecting different menu
  fetchMenuItemsByCategory("lunch");

});

