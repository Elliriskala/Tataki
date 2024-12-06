import { setNewOrderStatus, fetchOrders } from "./services/apiService";
import { displayOrders } from "./components/orderManagementDisplay";
import { showOrderUpdatedModal } from "./components/modal";

// fetch orders and display them in the order management page
const fetchAndDisplayOrders = async (): Promise<void> => {
    try {
        const orders = await fetchOrders();

        if (!orders || orders.length === 0) {
            console.log("No orders found");
            return;
        }

        displayOrders(
            "pending-orders-table",
            orders.filter((o) => o.order_status === "Pending"),
        );
        displayOrders(
            "inprogress-orders-table",
            orders.filter((o) => o.order_status === "Inprogress"),
        );
        displayOrders(
            "completed-orders-table",
            orders.filter((o) => o.order_status === "Completed"),
        );
    } catch (error) {
        console.error("Failed to fetch and display orders", error);
    }
};

// change order status to "Inprogress" or "Completed" by clicking the button
document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("update-status-button")) {
        const orderId = target.getAttribute("data-id");
        const status = target.getAttribute("data-status");

        console.log("Clicked button details:", { orderId, status });

        if (!orderId && !status) {
            console.error("Order ID or status missing");
            return;
        }
        try {
            let newStatus: string;
            if (status === "Pending") {
                newStatus = "Inprogress";
            } else if (status === "Inprogress") {
                newStatus = "Completed";
            } else {
                console.log("Invalid status: ", status);
                return;
            }
            console.log(`Updating order ID ${orderId} to new status: ${newStatus}`);

            const updatedOrder = await setNewOrderStatus(
                Number(orderId),
                newStatus,
            );
            console.log(
                `Order ${updatedOrder.order_id} status updated to ${updatedOrder.order_status}`,
            );

            showOrderUpdatedModal(updatedOrder.order_status || "");

            await fetchAndDisplayOrders();
        } catch (error) {
            console.error("updateOrderStatus error:", error);
            throw new Error("Failed to update order status");
        }
    }
});

// Load the order management page
document.addEventListener("DOMContentLoaded", async () => {
    await fetchAndDisplayOrders();
});
