import { apiBaseUrl } from "./services/apiService";
import { updateCartDisplay } from "./components/cart";
import { getCart } from "./services/cartService";

// place the order
const placeOrder = async () => {
  try {
    const orderData = collectOrderData();
    console.log("Order data:", orderData);

    const response = await fetch(`${apiBaseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: orderData.user_id,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        total_price: orderData.total_price,
        order_items: orderData.order_items,
        general_comment: orderData.general_comment,
        order_type: orderData.order_type,
        order_status: orderData.order_status,
        delivery_address: orderData.delivery_address,
        postal_code: orderData.postal_code,
        delivery_instructions: orderData.delivery_instructions,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error placing order: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Order placed successfully! Order ID: ${result.orderId}`);

    // clearing the cart after placing the order
    localStorage.removeItem("cart");
    updateCartDisplay();

    // reset the form fields
    resetFormFields();
  } catch (error) {
    console.error("Error placing order:", error);
    console.log("There was an issue placing your order. Please try again.");
  }
};

// collect the order details
const collectOrderData = () => {
  // Get cart items
  const cartItems = getCart().map((item: any) => ({
    menu_id: item.menu_id,
    course_name: item.course_name,
    price: item.price,
    item_quantity: item.quantity,
  }));

  // if user logged in get user id
  const user_id = localStorage.getItem("user_id");

  console.log("User ID:", user_id);

  // Get customer information
  const customer_name =
    (
      document.querySelector(
        ".order-user-info input[placeholder='Name']"
      ) as HTMLInputElement
    )?.value.trim() || "";

  if (!customer_name) {
    throw new Error("Customer name is required.");
  }

  // optionals email and phone number
  const customer_email =
    (
      document.querySelector(
        ".order-user-info input[placeholder='Email']"
      ) as HTMLInputElement
    )?.value.trim() || "";
  const customer_phone =
    (
      document.querySelector(
        ".order-user-info input[placeholder='Phone number']"
      ) as HTMLInputElement
    )?.value.trim() || "";

  // Get total price
  const total_price = getCart().reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  // delivery method
  const deliveryCheckbox = document.getElementById(
    "delivery-checkbox"
  ) as HTMLInputElement | null;
  const isDelivery = deliveryCheckbox ? deliveryCheckbox.checked : false;
  const pickupCheckbox = document.getElementById(
    "pickup-checkbox"
  ) as HTMLInputElement | null;
  const isPickup = pickupCheckbox ? pickupCheckbox.checked : false;

  let order_type = "";
  if (isDelivery && !isPickup) {
    order_type = "delivery";
  } else if (!isDelivery && isPickup) {
    order_type = "pickup";
  } else {
    throw new Error("Please select either Delivery or Pickup, but not both.");
  }

  // Get comments
  const additionalCommentElement = document.getElementById("leave-comment");
  const additionalComment = additionalCommentElement
    ? (additionalCommentElement as HTMLTextAreaElement).value.trim()
    : "";

  console.log("Additional Comment:", additionalComment);

  const deliveryInstructionsElement = document.getElementById("instructions");
  const deliveryInstructions = deliveryInstructionsElement
    ? (deliveryInstructionsElement as HTMLTextAreaElement).value.trim()
    : "";

  // Check terms and conditions
  const termsCheckbox = document.getElementById(
    "terms-checkbox"
  ) as HTMLInputElement | null;
  const hasAgreedToTerms = termsCheckbox ? termsCheckbox.checked : false;
  if (!hasAgreedToTerms) {
    throw new Error(
      "You must agree to the Terms and Conditions to place an order."
    );
  }

  // return the collected data
  return {
    user_id,
    customer_name,
    customer_email,
    customer_phone,
    total_price,
    order_type,
    order_status: "pending",
    general_comment: additionalComment,
    delivery_address: isDelivery
      ? (
          document.querySelector(
            ".order-user-info input[placeholder='Address']"
          ) as HTMLInputElement
        )?.value.trim() || ""
      : null,
    postal_code: isDelivery
      ? (
          document.querySelector(
            ".order-user-info input[placeholder='Postal code']"
          ) as HTMLInputElement
        )?.value.trim() || ""
      : null,
    delivery_instructions: deliveryInstructions,
    order_items: cartItems,
  };
};

// function to reset the form fields after placing the order
const resetFormFields = () => {
  const formFields = [
    ".order-user-info input[placeholder='Name']",
    ".order-user-info input[placeholder='Email']",
    ".order-user-info input[placeholder='Phone number']",
    ".order-user-info input[placeholder='Address']",
    ".order-user-info input[placeholder='Postal code']",
    "#leave-comment",
    "#instructions",
  ];

  formFields.forEach((field) => {
    const element = document.querySelector(field) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (element) {
      element.value = ""; // Reset value
    }
  });

  // Reset checkboxes
  const checkboxes = [
    "#delivery-checkbox",
    "#pickup-checkbox",
    "#terms-checkbox",
  ];

  checkboxes.forEach((checkbox) => {
    const element = document.querySelector(checkbox) as HTMLInputElement | null;
    if (element) {
      element.checked = false; // Uncheck the checkbox
    }
  });
};

export { placeOrder };
