'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMenuToDisplay = exports.displayMenu = void 0;
var menuItems_1 = require("./menuItems");
// Creating the menus to display 
var displayMenu = function (menus) {
    var menuContainer = document.querySelector(".menu-container");
    if (!menuContainer) {
        console.log("Menu container not found");
        return;
    }
    menus.forEach(function (menu) {
        var menuCard = document.createElement("div");
        menuCard.classList.add("menu-card");
        menuCard.innerHTML = "\n                    <div class=\"menu-placeholder\">\n                            <div class=\"image-placeholder\">\n                                    <div class=\"menu-image\" style=\"background-image: url('".concat(menu.menuImage, "')\"></div>\n                            </div>\n                            <div>\n                                    <h3 class=\"menu-header\">").concat(menu.menuName, "</h3>\n                                    <p>").concat(menu.menuDescription, "</p>\n                                    <p class=\"price\">").concat(menu.price, "</p>\n                                    <p class=\"allergen-info\">Allergens: ").concat(menu.allergens, "</p>\n                            </div>\n                    </div>\n                    ");
        menuContainer.appendChild(menuCard);
    });
};
exports.displayMenu = displayMenu;
// selecting the menus to display based on the button clicked
var selectMenuToDisplay = function () {
    var lunchButton = document.querySelector(".lunch-button");
    var dinnerButton = document.querySelector(".dinner-button");
    var sideButton = document.querySelector(".sides-button");
    var drinkButton = document.querySelector(".drinks-button");
    var dessertButton = document.querySelector(".desserts-button");
    if (!lunchButton ||
        !dinnerButton ||
        !sideButton ||
        !drinkButton ||
        !dessertButton) {
        console.log("Buttons not found");
        return;
    }
    lunchButton.addEventListener("click", function () {
        displayMenu(menuItems_1.lunchMenus);
    });
    dinnerButton.addEventListener("click", function () {
        displayMenu(menuItems_1.dinnerMenus);
    });
    sideButton.addEventListener("click", function () {
        displayMenu(menuItems_1.sideMenus);
    });
    drinkButton.addEventListener("click", function () {
        displayMenu(menuItems_1.drinkMenus);
    });
    dessertButton.addEventListener("click", function () {
        displayMenu(menuItems_1.dessertMenus);
    });
};
exports.selectMenuToDisplay = selectMenuToDisplay;
selectMenuToDisplay(); // selecting different menu
displayMenu(menuItems_1.lunchMenus); // Default menu
