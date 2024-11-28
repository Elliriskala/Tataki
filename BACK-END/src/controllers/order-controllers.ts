import {
  fetchOrders,
  fetchOrderById,
  fetchOrderByUserId,
  fetchOrdersByStatus,
  createOrder,
  updateOrderStatus
} from "../models/order-model";
import { Request, Response, NextFunction } from "express";
import { Order } from "../utils/interfaces";
import { OrderItem } from "../utils/interfaces";
import { customError } from "../middlewares/error-handlers";

/**
 * Fetch all orders
 * @param req
 * @param res
 * @returns all orders
 * @throws Error
 * @returns {Promise<void>} - Orders or null if not found
 */

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Fetch all orders
    const orders = await fetchOrders(next);

    if (!orders) {
      return next(customError("Orders not found", 404));
    }

    // the orders
    res.json(orders);
  } catch (e) {
    console.error("getAllOrders error:", (e as Error).message);
    return next(customError("getAllOrders error: " + (e as Error).message));
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

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const orderId = Number(req.params.order_id);
  try {
    // Fetch order by order id
    const order = await fetchOrderById(orderId, next);

    if (!order) {
      return next(customError("Order not found", 404));
    }

    // the order
    res.json(order);
  } catch (e) {
    console.error("getOrderById error:", (e as Error).message);
    return next(customError("getOrderById error: " + (e as Error).message));
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

const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = Number(req.params.user_id);
  try {
    // Fetch orders by user id
    const orders = await fetchOrderByUserId(userId, next);

    if (!orders) {
      return next(customError("Orders not found", 404));
    }

    // the orders
    res.json(orders);
  } catch (e) {
    console.error("getOrdersByUserId error:", (e as Error).message);
    return next(
      customError("getOrdersByUserId error: " + (e as Error).message)
    );
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

const getOrdersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const status = req.params.order_status;
  try {
    // Fetch orders by status
    const orders = await fetchOrdersByStatus(status, next);

    if (!orders) {
      return next(customError("Orders not found", 404));
    }

    // the orders
    res.json(orders);
  } catch (e) {
    console.error("getOrdersByStatus error:", (e as Error).message);
    return next(
      customError("getOrdersByStatus error: " + (e as Error).message)
    );
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

const postOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("Incoming payload:", req.body);

    const { customer_name, total_price, order_items, order_type, order_status } = req.body;

    if (
      !order_items ||
      !Array.isArray(order_items) ||
      order_items.length === 0
    ) {
      throw new Error("Missing or invalid order_items in the request.");
    }
    // Create an order
    const newOrder = await createOrder(
      customer_name,
      total_price,
      order_items,
      order_type,
      order_status,
      next
    );

    if (!newOrder) {
      return next(customError("Order not created", 404));
    }

    // the order
    res.json(newOrder);
  } catch (e) {
    console.error("postOrder error:", (e as Error).message);
    return next(customError("postOrder error: " + (e as Error).message));
  }
};

/**
 * Update order status
 * @param req
 * @param res
 * @returns updated order status
 * @throws Error
 * @returns {Promise<void>} - Order status or null if not found
 */

const putOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = Number(req.params.order_id);
    const orderStatus = req.body.order_status;

    // Update order status
    const updatedOrderStatus = await updateOrderStatus(
      orderId,
      orderStatus,
      next
    );

    if (!updatedOrderStatus) {
      return next(customError("Order status not updated", 404));
    }

    // the order status
    res.json({ order_id: orderId, order_status: orderStatus });
  } catch (e) {
    console.error("putOrderStatus error:", (e as Error).message);
    return next(customError("putOrderStatus error: " + (e as Error).message));
  }
};

export {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByStatus,
  postOrder,
  putOrderStatus
};
