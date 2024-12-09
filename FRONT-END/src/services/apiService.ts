import { Menu } from "../utils/interfaces";
import { Order } from "../utils/interfaces";
import { logError } from "../utils/functions";

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
        logError(error, "fetchMenuItems");
        return [];
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
        logError(error, "fetchMenuItemsByCategory");
        return [];
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
        logError(error, "fetchSpecialMenus");
        return [];
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

        if (!response.ok) {
            throw new Error(
                `Error fetching item details: ${response.statusText}`,
            );
        }

        const itemArray = JSON.parse(rawResponse);

        if (!itemArray || itemArray.length === 0) {
            return {} as Order;
        }

        const item = itemArray[0];
        return item;
    } catch (error) {
        logError(error, "fetchItemDetails");
        return {} as Order;
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
        return {};
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
        logError(error, "fetchUserInfo");
        return {};
    }
};

/**
 * fetching all orders from the database
 * @returns {Order[]} - orders
 */
export const fetchOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
        logError(new Error("No token found in local storage"), "fetchOrders");
        return [];
    }

    try {
        const response = await fetch(`${apiBaseUrl}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            logError(new Error("Failed to fetch orders"), "fetchOrders");
        }

        const rawResponse = await response.text();

        const orders: Order[] = JSON.parse(rawResponse);
        return orders;
    } catch (error) {
        logError(error, "fetchOrders");
        return [];
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
        const token = localStorage.getItem("authToken"); // Get token from localStorage

        if (!token) {
            return {} as Order;
        }

        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return {} as Order;
        }

        // Check if the response is valid JSON
        const order: Order = await response.json();

        // If order is empty or invalid, return a default object or handle the error
        if (!order || !order.order_id) {
            return {} as Order;
        }

        return order;
    } catch (error) {
        return {} as Order;
    }
};

/**
 * fetch orders by user id
 * @returns {Order[]} - orders
 * @throws Error if fetching fails or response is not ok
 */
export const fetchOrdersByUserId = async (): Promise<Order[]> => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
        return [];
    }

    try {
        const response = await fetch(`${apiBaseUrl}/orders/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return [];
        }

        const orders: Order[] = await response.json();
        return orders;
    } catch (error) {
        return [];
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
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
        logError(
            new Error("No token found in local storage"),
            "setNewOrderStatus",
        );
        return {} as Order;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order_status: status }),
        });

        if (!response.ok) {
            throw new Error(
                `Error updating order status: ${response.statusText}`,
            );
        }

        const updatedOrder = await response.json();
        return updatedOrder;
    } catch (error) {
        logError(error, "setNewOrderStatus");
        return {} as Order;
    }
};
