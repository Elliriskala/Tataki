import { displayMenu } from "../components/menuDisplay";
import { fetchSpecialMenus } from "../services/apiService";
import { logError } from "../utils/functions";

// update the carousel display position based on the current menu position
const updateCarouselposition = (
    menuTracker: HTMLDivElement,
    menuItems: NodeListOf<Element>,
    menuPosition: number,
    menuWidth: number,
    specialMenus: any[],
): void => {
    // update the menuTracker position to display the current menu
    menuTracker.style.transform = `translateX(-${menuPosition * menuWidth}px)`;

    const leftArrow = document.querySelector(
        "#carousel-left",
    ) as HTMLButtonElement;
    const rightArrow = document.querySelector(
        "#carousel-right",
    ) as HTMLButtonElement;

    // enable/disable arrows based on the current position
    if (leftArrow) leftArrow.disabled = menuPosition === 0;
    if (rightArrow)
        rightArrow.disabled = menuPosition >= specialMenus.length - 1;

    // update the active menu item
    menuItems.forEach((item, index) => {
        item.classList.remove("active");
        if (index === menuPosition) {
            item.classList.add("active");
        }
    });
};

// function to handle the arrow click events
const handleArrowClick = (
    leftArrow: HTMLButtonElement,
    rightArrow: HTMLButtonElement,
    specialMenus: any[],
    updateCarousel: (menuPosition: number) => void,
): void => {
    let menuPosition = 0; // current menu position

    // scroll menu to the left
    leftArrow.addEventListener("click", () => {
        if (menuPosition > 0) {
            menuPosition -= 1;
            updateCarousel(menuPosition);
        }
    });

    // scroll menu to the right

    rightArrow.addEventListener("click", () => {
        if (menuPosition < specialMenus.length - 1) {
            menuPosition += 1;
            updateCarousel(menuPosition);
        }
    });
};

// swipe the carousel to the left or right on touch devices
const handleMobileSwipe = (
    event: TouchEvent,
    menuTracker: HTMLDivElement,
    menuItems: NodeListOf<Element>,
    specialMenus: any[],
) => {
    const touchStart = event.touches[0].clientX;
    let touchEnd = 0;

    const handleTouchMove = (e: TouchEvent) => {
        touchEnd = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchEnd < touchStart) {
            // swipe left
            const menuPosition = Math.min(
                specialMenus.length - 1,
                menuTracker.scrollLeft / menuItems[0].clientWidth + 1,
            );
            updateCarouselposition(
                menuTracker,
                menuItems,
                menuPosition,
                menuItems[0].clientWidth,
                specialMenus,
            );
        } else {
            // swipe right
            const menuPosition = Math.max(
                0,
                menuTracker.scrollLeft / menuItems[0].clientWidth - 1,
            );
            updateCarouselposition(
                menuTracker,
                menuItems,
                menuPosition,
                menuItems[0].clientWidth,
                specialMenus,
            );
        }

        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
};

// display the special menus in the carousel
export const initializeCarousel = async (
    menuTracker: HTMLDivElement,
    lang: string,
): Promise<void> => {
    try {
        
        // fetch the special menus
        const specialMenus = await fetchSpecialMenus();
        if (!specialMenus || specialMenus.length === 0) {
            logError("No special menus found.", "initializeCarousel");
        }

        // display the special menus in the carousel
        displayMenu(specialMenus, menuTracker, lang);

        const menuTrack = document.querySelector(
            ".menu-track",
        ) as HTMLDivElement;
        if (!menuTrack) {
            logError("Menu track not found.", "initializeCarousel");
            return;
        }

        const initializeCarouselLogic = () => {
            const menuItems = menuTrack.querySelectorAll(".menu-card");
            if (menuItems.length === 0) {
                logError("No menu items found.", "initializeCarousel");
                return;
            }

            const menuWidth = menuItems[0]?.clientWidth || 0;

            // function to update the carousel display
            const updateCarousel = (menuPosition: number) => {
                updateCarouselposition(
                    menuTracker,
                    menuItems,
                    menuPosition,
                    menuWidth,
                    specialMenus,
                );
            };
            const leftArrow = document.querySelector(
                "#carousel-left",
            ) as HTMLButtonElement;
            const rightArrow = document.querySelector(
                "#carousel-right",
            ) as HTMLButtonElement;

            if (leftArrow && rightArrow) {
                handleArrowClick(
                    leftArrow,
                    rightArrow,
                    specialMenus,
                    updateCarousel,
                );
            } else {
                logError("Carousel arrows not found.", "initializeCarousel");
            }

            // initialize the carousel to display the first menu item
            updateCarousel(0);

            // swipe functionality for mobile devices
            menuTrack.addEventListener("touchstart", (event) =>
                handleMobileSwipe(event, menuTracker, menuItems, specialMenus),
            );
        };

        // check if the menu items are loaded before initializing the carousel
        const observer = new MutationObserver(() => {
            const menuItems = menuTrack.querySelectorAll(".menu-card");
            if (menuItems.length > 0) {
                observer.disconnect();
                initializeCarouselLogic();
            }
        });

        observer.observe(menuTrack, { childList: true });
    } catch (error) {
        logError(error, "initializeCarousel");
        return;
    }
};
