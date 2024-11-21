const luchMenus = [
  {
    menuName: "Kyoto Bliss",
    menuDescription:
      "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.<br><br>Spring Petal Roll: Salmon, avocado and cream cheese wrapped in sushi rice and nori, garnished with sesame seeds.",
    price: "16,90€",
    allergens: "F, M",
    menuImage: "img/menu-images/salmon-avocado-roll2.jpg",
  },
  {
    menuName: "Hokkaido Harmony",
    menuDescription:
      "8-piece California Roll, 4 pieces of yellowtail sashimi and edamame beans.<br><br>California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise.",
    price: "15,90€",
    allergens: "F",
    menuImage: "img/menu-images/california-roll2.jpg",
  },
  {
    menuName: "Ocean Zen Platter",
    menuDescription:
      "6-piece Flame Roll, 4 pieces of sake nigiri and edamame beans.<br><br>Flame Roll: Spicy tuna with avocado, wrapped in rice and nori, topped with sesame seeds and spicy vegan mayonnaise.",
    price: "18,90€",
    menuImage: "img/menu-images/spicy-tuna-roll2.jpg",
    allergens: "F, G, S",
  },
  {
    menuName: "Golden Sun",
    menuDescription:
      "8-piece Crunchy Shrimp Roll, 2 pieces of unagi nigiri and miso soup.<br><br>Crunchy Shrimp Roll: Tempura shrimp, avocado, and cucumber wrapped in rice and nori, finished with a drizzle of eel sauce.",
    price: "19,90€",
    menuImage: "img/menu-images/crunchy-shrimp-roll.jpg",
    allergens: "F, G, S",
  },
  {
    menuName: "Sakura Delight",
    menuDescription:
      "8-piece Garden Harmony Roll, 4 pieces of tofu nigiri and edamame beans.<br><br>Garden Harmony Roll: A vibrant mix of red cabbage, wakame salad, carrot, paprika and tofu rolled in rice and nori, topped with sesame seeds.",
    price: "15,90€",
    menuImage: "img/menu-images/vegan-sushi2.jpg",
    allergens: "S",
  },
  {
    menuName: "Tokyo Trio",
    menuDescription:
      "8-piece Golden Dragon roll, 2 pieces of maguro nigiri and miso soup.<br><br>Golden Dragon Roll: White fish, cucumber, and carrot wrapped in sushi rice, topped with freshwater eel, herbs and eel sauce.",
    price: "19,90€",
    menuImage: "img/menu-images/dragon-roll.jpg",
    allergens: "F, S",
  },
];

const displayMenu = () => {
  const menuContainer = document.querySelector(".menu-page-container");
  luchMenus.forEach((menu) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");
    menuCard.innerHTML = `
        <div class="menu-page-placeholder">
            <div class="image-placeholder">
                <div class="menu-image" style="background-image: url(${menu.menuImage});"></div>
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

displayMenu();
