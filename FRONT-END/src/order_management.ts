import { setNewOrderStatus, fetchOrders } from "./services/apiService";
import { displayOrders } from "./components/orderManagementDisplay";
import { showOrderUpdatedModal } from "./components/modal";
import { logError } from "./utils/functions";

// fetch orders and display them in the order management page
const fetchAndDisplayOrders = async (): Promise<void> => {
    try {
        const orders = await fetchOrders();

        if (!orders || orders.length === 0) {
            logError("No orders found", "fetchAndDisplayOrders");
            return;
        }

        // display orders in the order management page
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
        throw new Error("Failed to fetch orders");
    }
};

// change order status to "Inprogress" or "Completed" by clicking the button
document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("update-status-button")) {
        const orderId = target.getAttribute("data-id");
        const status = target.getAttribute("data-status");

        if (!orderId && !status) {
            return;
        }
        // update the order status to "Inprogress" or "Completed"
        try {
            let newStatus: string;
            if (status === "Pending") {
                newStatus = "Inprogress";
            } else if (status === "Inprogress") {
                newStatus = "Completed";
            } else {
                return;
            }

            const updatedOrder = await setNewOrderStatus(
                Number(orderId),
                newStatus,
            );

            showOrderUpdatedModal(updatedOrder.order_status || "");

            // fetch and display the updated orders
            await fetchAndDisplayOrders();
        } catch (error) {
            throw new Error("Failed to update order status");
        }
    }
});

// initialize the order management page
const initializeOrderManagementPage = async (): Promise<void> => {
    try {
        await fetchAndDisplayOrders();
    } catch (error) {
        logError(error, "initializeOrderManagementPage");
    }
};

export { initializeOrderManagementPage };