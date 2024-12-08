// modal for item added to cart confirmation
const modalElement = document.querySelector(
    ".item-added-to-cart",
) as HTMLElement;

export const showModal = (): void => {
    modalElement.style.display = "block";
    setTimeout(() => {
        modalElement.style.display = "none";
    }, 1500);
};

// modal for processing order
export const showProcessingModal = (): void => {
    const processingElement = document.querySelector(
        ".processing-order",
    ) as HTMLElement | null;

    if (processingElement) {
        processingElement.style.display = "block";
        setTimeout(() => {
            processingElement.style.display = "none";
        }, 5000);
    } else {
        return;
    }
};

// modal for order has been placed confirmation

export const showOrderPlacedModal = (): void => {
    const orderPlacedElement = document.querySelector(
        ".order-placed",
    ) as HTMLElement | null;

    const orderConfirmationClose = document.querySelector(
        "#order-placed-button",
    ) as HTMLButtonElement | null;

    if (orderPlacedElement) {
        orderPlacedElement.style.display = "block";
    } else {
        return;
    }

    if (orderConfirmationClose) {
        orderConfirmationClose.addEventListener("click", () => {
            if (orderPlacedElement) {
                orderPlacedElement.style.display = "none";
            }
        });
    } else {
        return;
    }
};

/**
 * Show the modal with the updated order status.
 * @param {string} updatedStatus - The updated order status to display.
 * @returns {void}
 * @throws {Error} - If the modal element is not found.
 */

export const showOrderUpdatedModal = (updatedStatus: string): void => {
    const orderUpdatedElement = document.querySelector(
        ".update-order-dialog",
    ) as HTMLElement | null;

    if (!orderUpdatedElement) {
        return;
    }

    const statusElement = document.querySelector(
        "#updated-status",
    ) as HTMLElement | null;

    if (!statusElement) {
        return;
    }

    // set the updated status
    statusElement.textContent = updatedStatus;

    // display the modal
    orderUpdatedElement.style.display = "block";

    setTimeout(() => {
        if (orderUpdatedElement) {
            orderUpdatedElement.style.display = "none";
        } else {
            return;
        }   
    }, 2000);
};
