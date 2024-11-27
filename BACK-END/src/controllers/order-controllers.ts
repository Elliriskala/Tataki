import {
  fetchOrders,
  fetchOrderById,
  fetchOrderByUserId,
  fetchOrdersByStatus,
  createOrder,
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
  const order: Order = {
    user_id: req.body.user_id,
    order_items: req.body.order_items as OrderItem[],
    order_type: req.body.order_type,
    order_status: req.body.order_status,
    created_at: req.body.created_at,
  };
  try {
    // Create an order
    const newOrder = await createOrder(
      order.user_id,
      order.order_items,
      order.order_type,
      order.order_status,
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

export { getAllOrders, getOrderById, getOrdersByUserId, getOrdersByStatus, postOrder };
