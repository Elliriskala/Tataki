import { Order } from "../utils/interfaces";
import { fetchOrdersById, fetchOrdersByUserId } from "../services/apiService";

// display orders in the order management page
export const displayOrders = (elementId: string, orders: Order[]): void => {
    const container = document.getElementById(elementId) as HTMLElement;
    if (!container) {
        console.log(`Element with id ${elementId} not found`);
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
        console.log("Element with id order-details not found");
        return;
    }

    orderDetails.innerHTML = generateOrderDetails(order);

    const closeButton = document.querySelector(".close") as HTMLButtonElement;
    const updateStatusButton = document.querySelector(".update-order") as HTMLButtonElement;
    
    updateStatusButton.setAttribute("data-id", order.order_id.toString());
    updateStatusButton.setAttribute(
        "data-status",
        order.order_status || "unknown",
    );
    
    console.log("Button attributes:", {
        id: updateStatusButton.getAttribute("data-id"),
        status: updateStatusButton.getAttribute("data-status"),
    });
    
    closeButton.addEventListener("click", () => {
        orderDetails.innerHTML = "";
    });
    
    console.log("Order details HTML:", orderDetails.innerHTML);
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
        console.error("Order ID not found");
        return;
    }

    try {
        const order = await fetchOrdersById(Number(orderId));
        displayOrderDetails(order);
    } catch (error) {
        console.error("Failed to fetch order details", error);
    }
};

export const displayOrderHistory = async (user_id: string): Promise<void> => {
    const orders = await fetchOrdersByUserId(Number(user_id));

    const orderHistory = document.getElementById(
        "order-history",
    ) as HTMLElement;
    if (!orderHistory) {
        console.log("Element with id order-history not found");
        return;
    }

    orderHistory.innerHTML = orders.length
        ? generateOrderHistoryTable(orders)
        : "<p>No order history found</p>";
};

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

const generateOrderDetails = (order: Order): string => `
    <h2>Order Details</h2>
    <p><strong>Order time:</strong> ${new Date(order.created_at).toLocaleString()}</p>
    <p><strong>Order ID:</strong> ${order.order_id}</p>
    <p><strong>Status:</strong> ${order.order_status}</p>
    <p><strong>Customer:</strong> ${order.customer_name}</p>
    <p><strong>Items:</strong> ${order.order_items || "No items"}</p>
    <p><strong>Comments:</strong> ${order.general_comment || "No comments"}</p>
    <p><strong>Total Price:</strong> ${order.total_price}</p>
    <p><strong>Status:</strong> ${order.order_status}</p>
    ${
        order.is_delivery
            ? `<p><strong>Address:</strong> ${order.delivery_address}</p>
            <p><strong>City:</strong> ${order.city}</p>
            <p><strong>Delivery Instructions:</strong> ${order.delivery_instructions || "No instructions"}</p>`
            : ""
    }
`;

// display order history on user page
const generateOrderHistoryTable = (orders: Order[]): string => `
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Time</th>
                <th>Type</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${orders
                .map(
                    (order) =>
                        `<tr>
                            <td>${order.order_id}</td>
                            <td>${new Date(order.created_at).toLocaleString()}</td>
                            <td>${order.order_type}</td>
                            <td>${order.order_items}</td>
                            <td>${order.total_price}€</td>
                            <td>${order.order_status}</td>
                        </tr>`,
                )
                .join("")}
        </tbody>
    </table>
`;
