"use strict";

const lunchMenus = [
  {
    menuName: "Kyoto Bliss",
    menuDescription:
      "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.<br><br>Spring Petal Roll: Salmon, avocado and cream cheese wrapped in sushi rice and nori, garnished with sesame seeds.",
    price: "16,90€",
    allergens: "F, M",
    menuImage: "/img/menu-images/salmon-avocado-roll2.jpg",
  },
  {
    menuName: "Hokkaido Harmony",
    menuDescription:
      "8-piece California Roll, 4 pieces of yellowtail sashimi and edamame beans.<br><br>California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise.",
    price: "15,90€",
    allergens: "F",
    menuImage: "/img/menu-images/california-roll2.jpg",
  },
  {
    menuName: "Ocean Zen Platter",
    menuDescription:
      "6-piece Flame Roll, 4 pieces of sake nigiri and edamame beans.<br><br>Flame Roll: Spicy tuna with avocado, wrapped in rice and nori, topped with sesame seeds and spicy vegan mayonnaise.",
    price: "18,90€",
    menuImage: "/img/menu-images/spicy-tuna-maki2.jpg",
    allergens: "F, G, S",
  },
  {
    menuName: "Golden Sun",
    menuDescription:
      "8-piece Crunchy Shrimp Roll, 2 pieces of unagi nigiri and miso soup.<br><br>Crunchy Shrimp Roll: Tempura shrimp, avocado, and cucumber wrapped in rice and nori, finished with a drizzle of eel sauce.",
    price: "19,90€",
    menuImage: "/img/menu-images/crunchy-shrimp-roll2.jpg",
    allergens: "F, G, S",
  },
  {
    menuName: "Sakura Delight",
    menuDescription:
      "8-piece Garden Harmony Roll, 4 pieces of tofu nigiri and edamame beans.<br><br>Garden Harmony Roll: A vibrant mix of red cabbage, wakame salad, carrot, paprika and tofu rolled in rice and nori, topped with sesame seeds.",
    price: "15,90€",
    menuImage: "/img/menu-images/vegan-sushi2.jpg",
    allergens: "S",
  },
  {
    menuName: "Tokyo Trio",
    menuDescription:
      "8-piece Golden Dragon roll, 2 pieces of maguro nigiri and miso soup.<br><br>Golden Dragon Roll: White fish, cucumber, and carrot wrapped in sushi rice, topped with freshwater eel, herbs and eel sauce.",
    price: "19,90€",
    menuImage: "/img/menu-images/dragon-roll.jpg",
    allergens: "F, S",
  },
];

const dinnerMenus = [
  {
    menuName: "Moonlight Ocean",
    menuDescription:
      "6 pieces of unagi nigiri, 3 pieces of sake, ebi, hirame and maguro nigiris, 5 pieces of tako sashimi<br><br>Served with wakame salad and warm miso soup.",
    price: "28,90€",
    allergens: "F",
    menuImage: "/img/menu-images/dinnerplate3.jpg",
  },
  {
    menuName: "Imperial Feast",
    menuDescription:
      "2 pieces of sake nigiri, 4 makis of Philadelphia Roll, 8 salmon makis, 5 pieces of salmon sashimi, a bowl of duck ramen soup<br><br>Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon.<br><br>Ramen soup: Roasted duck slices, ramen noodles, boiled egg, chili oil and herbs",
    price: "29,90€",
    allergens: "E, F, G, S",
    menuImage: "/img/menu-images/dinnerplate7.jpg",
  },
  {
    menuName: "Emperor’s Delight",
    menuDescription:
      "9 pieces of sake nigiri, 6 pieces of unagi nigiri, 3 pieces of ebi nigiri, 4 makis of Dragon Roll  and 2 makis of Philadelphia Roll<br><br>Dragon Roll: Salmon, avocado and cream cheese, wrapped in sushi rice and nori, topped with freshwater eel and sesame seeds.<br><br>Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon.",
    price: "34,90€",
    allergens: "F, M, S",
    menuImage: "/img/menu-images/dinnerplate1.jpg",
  },
  {
    menuName: "Dragon's Elegance",
    menuDescription:
      "Combination of freely chosen nigiris, 6 makis of California and Philadelphia Roll<br><br>California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise.<br><br>Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon.",
    price: "42,90€",
    allergens: "F, M, S",
    menuImage: "/img/menu-images/dinnerplate2.jpg",
  },
  {
    menuName: "Traditional Harmony Bento",
    menuDescription:
      "A perfect balance of flavors and textures:<br><br>Fresh slices of salmon and tuna sashimi,<br><br>Crispy shrimp and vegetable tempura, sweet tamagoyaki, braised tofu, and a selection of simmered vegetables,<br><br>Miso soup, white rice topped with black sesame seeds and a traditional pickled plum.",
    price: "28,90€",
    allergens: "F, G, S",
    menuImage: "/img/menu-images/bento-box.jpg",
  },
  {
    menuName: "Deluxe Fusion Bento",
    menuDescription:
      "Combination of Japanese classics:<br><br>Sake, unagi and ebi nigiris, cucumber and salmon makis, salmon and tuna sashimi,<br><br>Sliced breaded chicken cutlet and prawns, garnished with green onions,<br><br>Wakame salad, steamed white rice and edamame beans.",
    price: "32,90€",
    allergens: "F, G, S",
    menuImage: "/img/menu-images/bento2.jpg",
  },
];

const sideMenus = [
  {
    menuName: "Wakame Salad",
    menuDescription:
      "Fresh and tangy seaweed salad, garnished chopped chili and sesame seeds.",
    price: "5,90€",
    allergens: "S",
    menuImage: "/img/menu-images/wakame-salad.jpg",
  },
  {
    menuName: "Edamame Beans",
    menuDescription: "Steamed and lightly salted soybeans, a perfect snack.",
    price: "4,90€",
    allergens: "S",
    menuImage: "/img/menu-images/edamame2.png",
  },
  {
    menuName: "Miso Soup",
    menuDescription:
      "Traditional Japanese soup made with fermented soybean paste, tofu, seaweed, mushrooms and green onions.",
    price: "6,90€",
    allergens: "S",
    menuImage: "/img/menu-images/miso-soup.jpg",
  },
  {
    menuName: "Sake Sashimi",
    menuDescription:
      "Fresh slices of salmon sashimi, served with wasabi and pickled ginger.",
    price: "8,90€",
    allergens: "F",
    menuImage: "/img/menu-images/salmonsashimi.jpg",
  },
  {
    menuName: "Maguro Sashimi",
    menuDescription:
      "Fresh slices of tuna sashimi, served with wasabi and pickled ginger.",
    price: "9,90€",
    allergens: "F",
    menuImage: "/img/menu-images/tunasashimi.jpg",
  },
  {
    menuName: "Mixed Sashimi Platter",
    menuDescription:
      "A selection of 16 sashimi slices featuring sake (salmon), maguro (tuna), and hamachi (yellowtail). Perfect for sharing or indulging.",
    price: "24,90€",
    allergens: "F",
    menuImage: "/img/menu-images/sashimiplate.jpg",
  },
];

const drinkMenus = [
  {
    menuName: "Matcha Latte",
    menuDescription:
      "A creamy and frothy blend of matcha green tea and steamed milk, sweetened with a touch of honey.",
    price: "4,90€",
    allergens: "M",
    menuImage: "/img/menu-images/matchalatte.jpg",
  },
  {
    menuName: "Green Tea",
    menuDescription:
      "A classic, soothing cup of traditional Japanese green tea. Made with finely ground tea leaves. Mild, smooth taste with a subtle earthy flavor.",
    price: "3,90€",
    allergens: "none",
    menuImage: "/img/menu-images/green-tea.jpg",
  },
  {
    menuName: "Yuzu Lemonade",
    menuDescription:
      "A refreshing Japanese citrus drink made with yuzu, a tart lemon-like fruit, and lightly sweetened with sugar. Served cold with a splash of soda.",
    price: "3,90€",
    allergens: "none",
    menuImage: "/img/menu-images/yuzy-lemonade.jpg",
  },
  {
    menuName: "Asahi Super Dry",
    menuDescription:
      "A crisp, refreshing Japanese lager with a clean, dry finish. Known for its smooth taste and perfect balance of bitterness.",
    price: "6,90€",
    allergens: "G",
    menuImage: "/img/menu-images/asahi.jpg",
  },
  {
    menuName: "Sapporo Premium",
    menuDescription:
      "A well-known Japanese lager that has a slightly malty sweetness with a crisp, refreshing finish. Perfect for those who prefer a slightly richer beer.",
    price: "7,90€",
    allergens: "G",
    menuImage: "/img/menu-images/sapporo3.jpg",
  },
  {
    menuName: "Sake",
    menuDescription:
      "A traditional Japanese rice wine with a smooth, clean taste and a slightly sweet finish. Served chilled or warm.",
    price: "6,90€",
    allergens: "none",
    menuImage: "/img/menu-images/sake3.jpg",
  },
];

const dessertMenus = [
  {
    menuName: "Matcha Tiramisu",
    menuDescription:
      "A Japanese twist on the classic tiramisu, with layers of delicate matcha-flavored cream and soft sponge soaked in green tea.",
    price: "7,90€",
    allergens: "E, G, M",
    menuImage: "/img/menu-images/matcha-tiramisu2.jpg",
  },
  {
    menuName: "Yatsuhashi",
    menuDescription:
    "A traditional Kyoto-style dessert made with cinnamon-flavored rice dough, often filled with sweet red bean paste or matcha.",
    price: "5,90€",
    allergens: "G",
    menuImage: "/img/menu-images/yatsuhashi.jpg",
  },
  {
    menuName: "Shirokama",
    menuDescription:
    "A lighter, fluffier version of the traditional cheesecake, with a smooth texture and a subtle sweet flavor. Made with cream cheese and a touch of citrus zest.",
    price: "7,90€",
    allergens: "E, G, M",
    menuImage: "/img/menu-images/cheese-cake.jpg",
  },
  {
    menuName: "Kohaku Jelly",
    menuDescription:
    "A delicate and refreshing jelly made from agar, with a layer of red bean paste and sweet syrup. Served chilled, offering a sweet, slightly chewy texture and smooth finish.",
    price: "5,90€",
    allergens: "none",
    menuImage: "/img/menu-images/jelly.jpg",
  },
  {
    menuName: "Uji Kintoki",
    menuDescription:
      "A sweet, refreshing dessert made with shaved ice topped with sweet red bean paste, syrup, and matcha powder.",
    price: "6,90€",
    allergens: "S",
    menuImage: "/img/menu-images/uji-kintoki2.jpg",
  },
  {
    menuName: "Black Sesame Cheesecake",
    menuDescription:
      "A rich and creamy cheesecake infused with the nutty, earthy flavor of roasted black sesame seeds, served with a berry compote.",
    price: "7,90€",
    allergens: "E, G, M",
    menuImage: "/img/menu-images/sesameseed-cheesecake.jpg",
  },
];

// Displaying the menu

const displayMenu = (menus) => {
  const menuContainer = document.querySelector(".menu-container");

  menuContainer.innerHTML = "";

  menus.forEach((menu) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");
    menuCard.innerHTML = `
          <div class="menu-placeholder">
              <div class="image-placeholder">
                  <div class="menu-image" style="background-image: url('${menu.menuImage}')"></div>
              </div>
              <div>
                  <h3 class="menu-header">${menu.menuName}</h3>
                  <p>${menu.menuDescription}</p>
                  <p class="price">${menu.price}</p>
                  <p class="allergen-info">Allergens: ${menu.allergens}</p>
              </div>
          </div>
          `;
    menuContainer.appendChild(menuCard);
  });
};

// selecting the menus to display

const selectMenuToDisplay = () => {
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

  lunchButton.addEventListener("click", () => {
    displayMenu(lunchMenus);
  });

  dinnerButton.addEventListener("click", () => {
    displayMenu(dinnerMenus);
  });

  sideButton.addEventListener("click", () => {
    displayMenu(sideMenus);
  });

  drinkButton.addEventListener("click", () => {
    displayMenu(drinkMenus);
  });

  dessertButton.addEventListener("click", () => {
    displayMenu(dessertMenus);
  });
};

selectMenuToDisplay(); // selecting different menu
displayMenu(lunchMenus); // Default menu

export { lunchMenus, dinnerMenus, sideMenus, displayMenu, selectMenuToDisplay };
