import { fetchOrders, fetchOrderById, fetchOrderByUserId, fetchOrdersByStatus, createOrder, } from "../models/order-model.js";
import { customError } from "../middlewares/error-handlers.js";
/**
 * Fetch all orders
 * @param req
 * @param res
 * @returns all orders
 * @throws Error
 * @returns {Promise<void>} - Orders or null if not found
 */
const getAllOrders = async (req, res, next) => {
    try {
        // Fetch all orders
        const orders = await fetchOrders(next);
        if (!orders) {
            return next(customError("Orders not found", 404));
        }
        // the orders
        res.json(orders);
    }
    catch (e) {
        console.error("getAllOrders error:", e.message);
        return next(customError("getAllOrders error: " + e.message));
    }
};
/**
 * Fetch order by order id
 * @param req
 * @param res
 * @returns order by order id
 * @throws Error
 * @returns {Promise<void>} - Order or null if not found
 */
const getOrderById = async (req, res, next) => {
    const orderId = Number(req.params.order_id);
    try {
        // Fetch order by order id
        const order = await fetchOrderById(orderId, next);
        if (!order) {
            return next(customError("Order not found", 404));
        }
        // the order
        res.json(order);
    }
    catch (e) {
        console.error("getOrderById error:", e.message);
        return next(customError("getOrderById error: " + e.message));
    }
};
/**
 * Fetch orders by user id
 * @param req
 * @param res
 * @returns orders by user id
 * @throws Error
 * @returns {Promise<void>} - Orders or null if not found
 */
const getOrdersByUserId = async (req, res, next) => {
    const userId = Number(req.params.user_id);
    try {
        // Fetch orders by user id
        const orders = await fetchOrderByUserId(userId, next);
        if (!orders) {
            return next(customError("Orders not found", 404));
        }
        // the orders
        res.json(orders);
    }
    catch (e) {
        console.error("getOrdersByUserId error:", e.message);
        return next(customError("getOrdersByUserId error: " + e.message));
    }
};
/**
 * Fetch orders by status
 * @param req
 * @param res
 * @returns orders by status
 * @throws Error
 * @returns {Promise<void>} - Orders or null if not found
 */
const getOrdersByStatus = async (req, res, next) => {
    const status = req.params.order_status;
    try {
        // Fetch orders by status
        const orders = await fetchOrdersByStatus(status, next);
        if (!orders) {
            return next(customError("Orders not found", 404));
        }
        // the orders
        res.json(orders);
    }
    catch (e) {
        console.error("getOrdersByStatus error:", e.message);
        return next(customError("getOrdersByStatus error: " + e.message));
    }
};
/**
 * Create an order
 * @param req
 * @param res
 * @returns created order
 * @throws Error
 * @returns {Promise<void>} - Order or null if not found
 */
const postOrder = async (req, res, next) => {
    try {
        console.log("Incoming payload:", req.body);
        const { user_id, order_items, order_type, order_status } = req.body;
        if (!order_items ||
            !Array.isArray(order_items) ||
            order_items.length === 0) {
            throw new Error("Missing or invalid order_items in the request.");
        }
        // Create an order
        const newOrder = await createOrder(user_id, order_items, order_type, order_status, next);
        if (!newOrder) {
            return next(customError("Order not created", 404));
        }
        // the order
        res.json(newOrder);
    }
    catch (e) {
        console.error("postOrder error:", e.message);
        return next(customError("postOrder error: " + e.message));
    }
};
export { getAllOrders, getOrderById, getOrdersByUserId, getOrdersByStatus, postOrder, };
