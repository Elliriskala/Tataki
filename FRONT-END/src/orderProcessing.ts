import { fetchUserInfo } from "./services/apiService";
import { updateCartDisplay } from "./components/cart";
import { getCart } from "./services/cartService";
import { showProcessingModal, showOrderPlacedModal } from "./components/modal";
import { logError } from "./utils/functions";
import { apiBaseUrl } from "./utils/variables"; 

// place the order
const placeOrder = async () => {
    try {
        // fetch the user info from the token to get the user id
        const userInfo = await fetchUserInfo();

        // collect the order data to send to the server
        const orderData = collectOrderData(userInfo);

        const response = await fetch(`${apiBaseUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // send the order data to the server
            body: JSON.stringify({
                user_id: userInfo?.user_id || "",
                customer_name: orderData.customer_name,
                customer_email: orderData.customer_email,
                customer_phone: orderData.customer_phone,
                total_price: orderData.total_price,
                order_items: orderData.order_items,
                general_comment: orderData.general_comment,
                order_type: orderData.order_type,
                order_status: orderData.order_status,
                ...(orderData.order_type === "delivery" && {
                    delivery_address: orderData.delivery_address,
                    city: orderData.city,
                    delivery_instructions: orderData.delivery_instructions,
                }),
            }),
        });

        // check if the response is ok
        if (!response.ok) {
            logError(new Error("Failed to place order"), "placeOrder");
        }

        await response.json();

        // show the processing order modal
        if (response.ok) {
            // show the processing order modal
            showProcessingModal();

            // show the order placed modal
            setTimeout(() => {
                showOrderPlacedModal();
            }, 5000);

            // clearing the cart after placing the order
            localStorage.removeItem("cart");
            updateCartDisplay();

            // reset the form fields
            resetFormFields();
        }
    } catch (error) {
        logError(error, "placeOrder");
    }
};

// collect the order details
const collectOrderData = (userInfo: any) => {
    // Get cart items
    const cartItems = getCart().map((item: any) => ({
        menu_id: item.menu_id,
        course_name: item.course_name,
        price: item.price,
        item_quantity: item.quantity,
    }));

    // Check if the user has selected items to order
    const order_items = cartItems;
    if (order_items.length === 0) {
        logError(new Error("No items in the cart"), "collectOrderData");
    }

    // Get customer information
    const customer_name =
        (
            document.querySelector(
                "input[data-translate='placeholder-name']",
            ) as HTMLInputElement
        )?.value.trim() || "";

    if (!customer_name) {
        logError(new Error("Customer name is required"), "collectOrderData");
    }

    // optional phone number
    const customer_email =
        (
            document.querySelector(
                "input[data-translate='placeholder-email']",
            ) as HTMLInputElement
        )?.value.trim() || "";
    const customer_phone =
        (
            document.querySelector(
                "input[data-translate='placeholder-phone']",
            ) as HTMLInputElement
        )?.value.trim() || "";

    // Get total price
    const total_price = getCart().reduce(
        (sum: number, item: { price: number; quantity: number }) =>
            sum + item.price * item.quantity,
        0,
    );

    if (total_price <= 0) {
        logError(new Error("Total price is required"), "collectOrderData");
    }


    // delivery method
    const deliveryCheckbox = document.getElementById(
        "delivery-checkbox",
    ) as HTMLInputElement | null;
    const isDelivery = deliveryCheckbox ? deliveryCheckbox.checked : false;
    const pickupCheckbox = document.getElementById(
        "pickup-checkbox",
    ) as HTMLInputElement | null;
    const isPickup = pickupCheckbox ? pickupCheckbox.checked : false;

    // Check if the user has selected a delivery method
    let order_type = "";
    if (isDelivery && !isPickup) {
        order_type = "delivery";
    } else if (!isDelivery && isPickup) {
        order_type = "pickup";
    } else {
        logError(new Error("Select a delivery method"), "collectOrderData");
    }

    order_type = isDelivery ? "delivery" : "pickup";

    console.log("order_type", order_type);

    // Get delivery address
    const delivery_address = isDelivery
        ? (
              document.querySelector(
                  "input[data-translate='placeholder-address']",
              ) as HTMLInputElement
          )?.value.trim()
        : null;
    const city = isDelivery
        ? (
              document.querySelector(
                  "input[data-translate='placeholder-city']",
              ) as HTMLInputElement
          )?.value.trim()
        : null;

    if (order_type === "delivery") {
        if (!delivery_address || !delivery_address.trim()) {
            logError(
                new Error("Delivery address is required"),
                "collectOrderData",
            );
        }
        if (!city || !city.trim()) {
            logError(new Error("City is required"), "collectOrderData");
        }
    }

    // Get comments
    const additionalCommentElement = document.getElementById("leave-comment");
    const additionalComment = additionalCommentElement
        ? (additionalCommentElement as HTMLTextAreaElement).value.trim()
        : "";

    // Get delivery instructions
    const deliveryInstructionsElement = document.getElementById("instructions");
    const deliveryInstructions = deliveryInstructionsElement
        ? (deliveryInstructionsElement as HTMLTextAreaElement).value.trim()
        : "";

    // return the collected data
    return {
        user_id: userInfo?.user_id || null, // user id from the token
        customer_name,
        customer_email,
        customer_phone,
        total_price,
        order_type,
        order_status: "pending",
        general_comment: additionalComment || null,
        delivery_address: delivery_address || null, 
        city: city || null,
        delivery_instructions: deliveryInstructions || null,
        order_items: cartItems,
    };

};

// function to reset the form fields after placing the order
const resetFormFields = () => {
    const formFields = [
        "input[data-translate='placeholder-name']",
        "input[data-translate='placeholder-email']",
        "input[data-translate='placeholder-phone']",
        "input[data-translate='placeholder-address']",
        "input[data-translate='placeholder-city']",
        "#leave-comment",
        "#instructions",
    ];

    // Reset input fields and textareas
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
    const checkboxes = ["#delivery-checkbox", "#pickup-checkbox"];

    checkboxes.forEach((checkbox) => {
        const element = document.querySelector(
            checkbox,
        ) as HTMLInputElement | null;
        if (element) {
            element.checked = false; // Uncheck the checkbox
        }
    });
};

export { placeOrder };
