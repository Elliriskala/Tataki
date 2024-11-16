"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const menuTracker = document.querySelector(".menu-track");
    const leftArrow = document.querySelector("#carousel-left");
    const rightArrow = document.querySelector("#carousel-right");
    let menuPosition = 0; // initial position
    const menuItems = document.querySelectorAll(".menu");
    const menuLength = menuItems.length;
    const container = menuTracker.parentElement;
    const calculateMenuWidth = () => {
        const menuStyle = window.getComputedStyle(menuItems[0]);
        const menuWidth = menuItems[0].offsetWidth;
        const marginRight = parseInt(menuStyle.marginRight || "0");
        return menuWidth + marginRight;
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
        menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;
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
    updateCarousel();
});
