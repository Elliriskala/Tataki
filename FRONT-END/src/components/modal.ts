// modal for item added to cart confirmation
const modalElement = document.querySelector(".item-added-to-cart") as HTMLElement;

export const showModal = (): void => {
  modalElement.style.display = "block";
  setTimeout(() => {
    modalElement.style.display = "none";
  }, 1500);
};