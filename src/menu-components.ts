'use strict';

import {lunchMenus} from './menuItems';

const displayMenu = () => {
    const menuContainer = document.querySelector(".menu-page-container") as HTMLDivElement;
    console.log("Menu Container:", menuContainer);
    lunchMenus.forEach((menu) => {
      const menuCard = document.createElement("div") as HTMLDivElement;
      menuCard.classList.add("menu-card");
      menuCard.innerHTML = `
          <div class="menu-page-placeholder">
              <div class="image-placeholder">
                  <div class="menu-image" style="background-image: url('${menu.menuImage}')"></div>
              </div>
              <div>
                  <h3 class="menu-header">${menu.menuName}</h3>
                  <p>${menu.menuDescription}</p>
                  <p class="price">${menu.price}</p>
                  <p class="allergens">Allergens: ${menu.allergens}</p>
              </div>
          </div>
          `;
      menuContainer.appendChild(menuCard);
    });
  };

export {displayMenu};