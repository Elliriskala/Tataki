import { Menu } from "../utils/interfaces";
import { Order } from "../utils/interfaces";

export const apiBaseUrl = "http://localhost:3000/api";

/**
 * Fetches all menus from the database
 * @returns Menu[]
 * @throws Error if fetching fails or response is not ok
 */

export const fetchMenuItems = async (): Promise<Menu[]> => {
    try {
        const response = await fetch(`${apiBaseUrl}/menus`, {
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
};

/**
 * Fetches all menus from the database based on the category
 * @param category
 * @returns Menu[]
 * @throws Error if fetching fails or response is not ok
 */

export const fetchMenuItemsByCategory = async (
    category: string,
): Promise<Menu[]> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/menus/category/${category}`,
            {
                headers: { "Content-Type": "application/json" },
            },
        );
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching menu items by category:", error);
        throw error;
    }
};

/**
 * Fetches all special menus from the database
 * @returns Menu[]
 * @throws Error if fetching fails or response is not ok
 */

export const fetchSpecialMenus = async (): Promise<Menu[]> => {
    try {
        const response = await fetch(`${apiBaseUrl}/menus/specials/1`, {
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching special menus:", error);
        throw error;
    }
};

/**
 * Fetches all menus from the database based on menu id
 * @param itemId - menu id
 * @returns Menu[]
 * @throws Error if fetching fails or response is not ok
 */
export const fetchItemDetails = async (itemId: number) => {
    try {
        const response = await fetch(`${apiBaseUrl}/menus/${itemId}`);

        const rawResponse = await response.text();
        console.log("Raw response:", rawResponse);

        if (!response.ok) {
            throw new Error(
                `Error fetching item details: ${response.statusText}`,
            );
        }

        const itemArray = JSON.parse(rawResponse);

        if (!itemArray || itemArray.length === 0) {
            console.error("Item not found");
            return null;
        }

        const item = itemArray[0];
        return item;
    } catch (error) {
        console.error("fetchItemDetails error:", error);
        throw new Error("Failed to fetch item details");
    }
};

/**
 * fetch user info to fill in the order fields if user is logged in
 * @returns user info if user is logged in
 * @throws Error if fetching fails or response is not ok
 */
export const fetchUserInfo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.log("No auth token found. User not logged in");
        return null;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/users/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching user info: ${response.statusText}`);
        }

        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error("fetchUserInfo error:", error);
        throw new Error("Failed to fetch user info");
    }
};

/**
 * fetching all orders from the database
 * @returns {Order[]} - orders
 */
export const fetchOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch(`${apiBaseUrl}/orders`, {
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.error(`Failed to fetch orders`, response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orders: Order[] = await response.json();
        return orders;
    } catch (error) {
        console.error("fetchOrders error:", error);
        throw new Error("Failed to fetch orders");
    }
};

/**
 * fetch order by order id from the database
 * @param {number} orderId - order id
 * @returns {Order} - order
 * @throws Error if fetching fails or response is not ok
 */
export const fetchOrdersById = async (orderId: number): Promise<Order> => {
    try {
        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch order with id: ${orderId},`,
                response.statusText,
            );
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const order: Order = await response.json();
        return order;
    } catch (error) {
        console.error("fetchOrdersById error:", error);
        throw new Error("Failed to fetch order by id");
    }
};

/**
 * fetch orders by user id
 * @param {number} userId - user id
 * @returns {Order[]} - orders
 * @throws Error if fetching fails or response is not ok
 */
export const fetchOrdersByUserId = async (userId: number): Promise<Order[]> => {
    try {
        const response = await fetch(`${apiBaseUrl}/orders/user/${userId}`, {
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch order items made by user: ${userId},`,
                response.statusText,
            );
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orderItems: Order[] = await response.json();
        return orderItems;
    } catch (error) {
        console.error("fetchOrderItemsByUserId error:", error);
        throw new Error("Failed to fetch order items by user id");
    }
};

/**
 * fetch orders by customer name
 * @param {string} customerName - customer name
 * @returns {Order[]} - orders
 * @throws Error if fetching fails or response is not ok
 */
export const fetchOrdersByCustomerName = async (
    customerName: string,
): Promise<Order[]> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/orders/customer/${customerName}`,
            {
                headers: { "Content-Type": "application/json" },
            },
        );

        if (!response.ok) {
            console.error(
                `Failed to fetch order items made by customer: ${customerName},`,
                response.statusText,
            );
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orderItems: Order[] = await response.json();
        return orderItems;
    } catch (error) {
        console.error("fetchOrderItemsByCustomerName error:", error);
        throw new Error("Failed to fetch order items by customer name");
    }
};

/**
 * update order status in the database
 * @param {number} orderId - order id
 * @param {string} status - order status
 * @returns {Order} - updated order
 * @throws Error if fetching fails or response is not ok
 */

export const setNewOrderStatus = async (
    orderId: number,
    status: string,
): Promise<Order> => {
    try {
        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_status: status }),
        });

        if (!response.ok) {
            throw new Error(
                `Error updating order status: ${response.statusText}`,
            );
        }

        const updatedOrder = await response.json();
        console.log("API response for updated order:", updatedOrder);
        return updatedOrder;
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        throw new Error("Failed to update order status");
    }
};
