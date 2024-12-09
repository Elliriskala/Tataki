import { Order } from "../utils/interfaces";
import { fetchOrdersById, fetchOrdersByUserId } from "../services/apiService";
import { getLanguage, logError } from "../utils/functions";
import { translations } from "../translations";

// display orders in the order management page
export const displayOrders = (elementId: string, orders: Order[]): void => {
    const container = document.getElementById(elementId) as HTMLElement;
    if (!container) {
        return;
    }

    container.innerHTML = orders.length
        ? generateOrderTable(orders)
        : "<p>No orders found</p>";

    attachOrderClickHandlers(container);
};

// handle the order click event and display order details
export const displayOrderDetails = (order: Order): void => {
    const orderDetails = document.getElementById(
        "order-details",
    ) as HTMLElement;
    if (!orderDetails) {
        return;
    }

    orderDetails.innerHTML = generateOrderDetails(order);

    // close button and update status button event listeners
    const closeButton = document.querySelector(".close") as HTMLButtonElement;
    const updateStatusButton = document.querySelector(
        ".update-order",
    ) as HTMLButtonElement;

    updateStatusButton.setAttribute("data-id", order.order_id.toString());
    updateStatusButton.setAttribute(
        "data-status",
        order.order_status || "unknown",
    );

    closeButton.addEventListener("click", () => {
        orderDetails.innerHTML = "";
    });
};

// attach click event to order links
const attachOrderClickHandlers = (container: HTMLElement): void => {
    const orderLinks = container.querySelectorAll(".order-link");
    orderLinks.forEach((link) =>
        link.addEventListener("click", async (event) =>
            handleOrderClick(event),
        ),
    );
};

// handle the order click event and display order details
export const handleOrderClick = async (event: Event): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const orderId = target.getAttribute("data-id");

    if (!orderId) {
        logError(new Error("Order ID not found"), "handleOrderClick");
        return;
    }

    try {
        const order = await fetchOrdersById(Number(orderId));
        if (!order || !order.order_id) {
            logError(
                new Error("Failed to load order details"),
                "handleOrderClick",
            );
            return;
        }
        displayOrderDetails(order);
    } catch (error) {
        logError(error, "handleOrderClick");
    }
};

// display order history on user page
export const displayOrderHistory = async (): Promise<void> => {
    const token = localStorage.getItem("authToken");
    const language = getLanguage();

    if (!token) {
        return;
    }

    const orders = await fetchOrdersByUserId();

    const orderHistory = document.getElementById(
        "order-history",
    ) as HTMLElement;
    if (!orderHistory) {
        return;
    }

    orderHistory.innerHTML = orders.length
        ? generateOrderHistoryTable(orders, language, translations)
        : `<p>${translations[language]["no-orders"]}</p>`;
};

// generate order table for display on order management page
const generateOrderTable = (orders: Order[]): string => `
    <table>
        <thead>
            <tr>
                <th>Order</th>
                <th>Customer</th>
            </tr>
        </thead>
        <tbody>
            ${orders
                .map(
                    (order) =>
                        `<tr>
                            <td><a href="#" class="order-link" data-id="${order.order_id}">${order.order_id}</a></td>
                            <td>${order.customer_name}</td>
                        </tr>`,
                )
                .join("")}
        </tbody>
    </table>
`;

// generate order details for display on order management page
const generateOrderDetails = (order: Order): string => `
    <h2>Order Details</h2>
    <p><strong>Order time:</strong> ${new Date(order.created_at).toLocaleString()}</p>
    <p><strong>Order ID:</strong> ${order.order_id}</p>
    <p><strong>Status:</strong> ${order.order_status}</p>
    <p><strong>Customer:</strong> ${order.customer_name}</p>
    <p><strong>Items:</strong> ${order.order_items || "No items"}</p>
    <p><strong>Comments:</strong> ${order.general_comment || "No comments"}</p>
    <p><strong>Total Price:</strong> ${order.total_price}</p>
    <p><strong>Order type: </strong>${order.order_type}</p>
    ${
        // display delivery address if order is delivery
        order.is_delivery
            ? `<p><strong>Address:</strong> ${order.delivery_address}</p>
            <p><strong>City:</strong> ${order.city}</p>
            <p><strong>Delivery Instructions:</strong> ${order.delivery_instructions || "No instructions"}</p>`
            : ""
    }
`;

// display order history on user page
const generateOrderHistoryTable = (
    orders: Order[],
    language: string,
    translations: Record<string, Record<string, string>>,
): string => {
    if (orders.length === 0) {
        return `
          <h2>${translations[language]["order-history"]}</h2>
          <p>${translations[language]["no-orders"]}</p>
        `;
    }
    // generate order history table with order details on user page
    const headers = `
            <tr>
                <th>${translations[language]["order-id"]}</th>
                <th>${translations[language]["time"]}</th>
                <th>${translations[language]["type"]}</th>
                <th>${translations[language]["items"]}</th>
                <th>${translations[language]["total"]}</th>
                <th>${translations[language]["status"]}</th>
            </tr>
    `;
    const rows = orders
        .map((order) => {
            return `<tr>
                            <td>${order.order_id}</td>
                            <td>${new Date(order.created_at).toLocaleString()}</td>
                            <td>${order.order_type}</td> 
                            <td>${order.order_items}</td>
                            <td>${order.total_price}€</td>
                            <td>${order.order_status}</td>
                        </tr>
                    `;
        })
        .join("");

    return `
                <h2>${translations[language]["order-history"]}</h2>
                <table>
                    ${headers}
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            `;
};
