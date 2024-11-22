'use strict';

import { displayMenu } from './menu-components';

// selecting the menus to display

export function selectMenuToDisplay(menuName: string) {
    const lunchButton = document.querySelector(".lunch-button") as HTMLButtonElement | null;
    const dinnerButton = document.querySelector(".dinner-button") as HTMLButtonElement | null;

    if (!lunchButton || !dinnerButton) {
        console.log("Buttons not found");
        return;
    }

    lunchButton.addEventListener("click", () => {
        if (menuName === "lunch") {
            displayMenu();
        }
    });

    dinnerButton.addEventListener("click", () => {
        if (menuName === "dinner") {
            displayMenu();
        }
    });
}

console.log('menu.ts is included!');
