"use strict";
import { lunchMenus, displayMenu, selectMenuToDisplay } from "../src/menu.js";

document.addEventListener("DOMContentLoaded", () => {
  const menuTracker = document.querySelector(".menu-track");
  const leftArrow = document.querySelector("#carousel-left");
  const rightArrow = document.querySelector("#carousel-right");

  if (!menuTracker || !leftArrow || !rightArrow) {
    console.log("Carousel elements not found");
    return;
  }

  let menuPosition = 0; // initial position

  const menuLength = lunchMenus.length;
  const container = menuTracker.parentElement;

  // function to calculate the width of a menu item including margin
  const calculateMenuWidth = () => {
    const menuItems = document.querySelectorAll(".menu-card");
    if (menuItems.length > 0) {
      const menuStyle = window.getComputedStyle(menuItems[0]);
      const menuWidth = menuItems[0].offsetWidth || 0;
      const marginRight = parseInt(menuStyle.marginRight || "0", 10);
      console.log(`Menu Width: ${menuWidth}, Margin Right: ${marginRight}`);
      return menuWidth + marginRight;
    }
    return;
  };
  // calculate the number of visible menus
  const calculateVisibleMenus = () => {
    const containerWidth = container.offsetWidth;
    const menuWidth = calculateMenuWidth();
    return Math.floor(containerWidth / menuWidth);
  };
  // function to update the menu positions
  const updateCarousel = () => {
    const menuWidth = calculateMenuWidth();
    console.log("Menu Width:", menuWidth);
    menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;

    rightArrow.disabled = menuPosition >= menuLength - calculateVisibleMenus();
    leftArrow.disabled = menuPosition <= 0;
    console.log(
      `Menu Length: ${menuLength}, Visible Menus: ${calculateVisibleMenus()}, Menu Position: ${menuPosition}`
    );
  };
  // scroll menu to the left
  leftArrow.addEventListener("click", () => {
    if (menuPosition > 0) {
      menuPosition -= 1;
      console.log("Menu Position after Left Click:", menuPosition);
      updateCarousel();
    }
  });
  // scroll menu to the right
  rightArrow.addEventListener("click", () => {
    if (menuPosition < menuLength - calculateVisibleMenus()) {
      menuPosition += 1;
      console.log("Menu Position after Right Click:", menuPosition);
      updateCarousel();
    }
  });
  window.addEventListener("resize", () => {
    const visibleMenus = calculateVisibleMenus();
    menuPosition = Math.min(menuPosition, menuLength - visibleMenus);
    updateCarousel();
  });

  displayMenu(lunchMenus);
  setTimeout(() => {
    updateCarousel();
  }, 100);

  const totalWidth = lunchMenus.length * calculateMenuWidth();
  menuTracker.style.width = `${totalWidth}px`;

  selectMenuToDisplay();

  console.log(document.querySelectorAll(".menu-card"));
  console.log(menuPosition);
  console.log(menuTracker.style.transform);

  const menuWidth = calculateMenuWidth();
  console.log(menuWidth);
});
