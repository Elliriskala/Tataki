import { Order } from "./utils/interfaces";

// fetch orders and display them in the order management page

const fetchAndDisplayOrders = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Failed to fetch orders:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const orders: Order[] = await response.json();

    if (!orders || orders.length === 0) {
      console.log("No orders found");
      return;
    }

    const pendingOrders = orders.filter(
      (order) => order.order_status === "Pending"
    );
    const inProgressOrders = orders.filter(
      (order) => order.order_status === "In progress"
    );
    const completedOrders = orders.filter(
      (order) => order.order_status === "Completed"
    );

    displayOrders("pending-orders-table", pendingOrders);
    displayOrders("inprogress-orders-table", inProgressOrders);
    displayOrders("completed-orders-table", completedOrders);
  } catch (error) {
    console.error("fetchAndDisplayOrders error:", error);
    throw new Error("Failed to fetch and display orders");
  }
};

// Display the orders in the order management page

const displayOrders = (elementId: string, orders: Order[]): void => {
  const container = document.getElementById(elementId) as HTMLElement;
  if (!container) {
    console.log(`Element with id ${elementId} not found`);
    return;
  }

  container.innerHTML = "";

  if (!orders || orders.length === 0) {
    container.innerHTML = "<p>No orders found</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Order</th>
        <th>Customer</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = table.querySelector("tbody") as HTMLTableSectionElement;

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><a href="#" class="order-link" data-id="${order.order_id}">${order.order_id}</a></td>
      <td>${order.customer_name}</td>
      <td>${order.order_status}</td>
    `;
    tbody.appendChild(row);
  });

  container.appendChild(table);

  const orderLinks = container.querySelectorAll(".order-link");
  orderLinks.forEach((link) => 
    link.addEventListener("click", async (event) => handleOrderClick(event))
  );
};

// Handle the order click event
const handleOrderClick = async (event: Event): Promise<void> => {
  event.preventDefault();
  const target = event.target as HTMLElement;
  const orderId = target.getAttribute("data-id");

  if (!orderId) {
    console.log("Order ID not found");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to fetch order:", response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const order: Order = await response.json();
    displayOrderDetails(order);
  } catch (error) {
    console.error("handleOrderClick error:", error);
    throw new Error("Failed to handle order click");
  }
};

// Display the order details
const displayOrderDetails = (order: Order): void => {
  const orderDetails = document.getElementById("order-details") as HTMLElement;
  if (!orderDetails) {
    console.log("Element with id order-details not found");
    return;
  }

  orderDetails.innerHTML = `
    <h2>Order Details</h2>
    <p><strong>Order ID:</strong> ${order.order_id}</p>
    <p><strong>Customer:</strong> ${order.customer_name}</p>
    <p><strong>Status:</strong> ${order.order_status}</p>
    <p><strong>Total Price:</strong> ${order.total_price}</p>
    <p><strong>Order Type:</strong> ${order.order_type}</p>
    <p><strong>Items:</strong> ${order.order_items || "No items"}</p>
    <p><strong>Comments:</strong> ${order.general_comment || "No comments"}</p>
    <p><strong>Created At:</strong> ${new Date(order.created_at).toLocaleString()}</p>
  `;

  if (order.is_delivery) {
    orderDetails.innerHTML += `
      <p><strong>Delivery Address:</strong> ${order.delivery_details?.delivery_address}</p>
      <p><strong>Postal Code:</strong> ${order.delivery_details?.postal_code}</p>
      <p><strong>Delivery Instructions:</strong> ${order.delivery_details?.delivery_instructions || "No instructions"}</p>
    `;
  }

  const orderItems = document.createElement("table");
  orderItems.innerHTML = `
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = orderItems.querySelector("tbody") as HTMLTableSectionElement;

  order.order_items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.course_name}</td>
      <td>${item.item_quantity}</td>
    `;
    tbody.appendChild(row);
  });

  orderDetails.appendChild(orderItems);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    orderDetails.innerHTML = "";
  });

  orderDetails.appendChild(closeButton);
};

// Load the order management page

document.addEventListener("DOMContentLoaded", async () => {
  await fetchAndDisplayOrders();
});
