import {
  fetchOrders,
  fetchOrderById,
  fetchOrderByCustomerName,
  fetchOrdersByUserId,
  fetchOrdersByStatus,
  createOrder,
  updateOrderStatus,
} from '../models/order-model.js';
import {
  validateString,
  validatePositiveNumber,
} from '../middlewares/validation.js';
import {customError} from '../middlewares/error-handlers.js';
import { decodeToken } from './auth-controller.js';


/**
 * Fetch all orders
 * @param req
 * @param res
 * @returns all orders
 * @throws Error
 * @returns - Orders or null if not found
 */
const getAllOrders = async (req, res, next) => {
  try {
    // Fetch all orders
    const orders = await fetchOrders(next);
    if (!orders) {
      return next(customError('Orders not found', 404));
    }
    // the orders
    res.status(200).json(orders);
  } catch (e) {
    console.error('getAllOrders error:', e.message);
    return next(customError('getAllOrders error: ' + e.message));
  }
};

/**
 * Fetch order by order id
 * @param req
 * @param res
 * @returns order by order id
 * @throws Error
 * @returns - Order or null if not found
 */
const getOrderById = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    // Fetch order by order id
    const order = await fetchOrderById(orderId, next);
    if (!order) {
      return next(customError('Order not found', 404));
    }
    // the order
    res.status(200).json(order);
  } catch (e) {
    console.error('getOrderById error:', e.message);
    return next(customError('getOrderById error: ' + e.message));
  }
};

/**
 * Fetch orders by customer name
 * @param req
 * @param res
 * @returns orders by customer name
 * @throws Error
 * @returns - Orders or null if not found
 */
const getOrdersByCustomerName = async (req, res, next) => {
  const customerName = req.params.customer_name;
  try {
    // Fetch orders by user id
    const orders = await fetchOrderByCustomerName(customerName, next);
    if (!orders) {
      return next(customError('Orders not found', 404));
    }
    // the orders
    res.status(200).json(orders);
  } catch (e) {
    console.error('getOrdersByCustomerName error:', e.message);
    return next(customError('getOrdersByCustomerName error: ' + e.message));
  }
};

/**
 * Fetch orders by user id
 * @param req
 * @param res
 * @returns orders by user id
 * @throws Error
 * @returns - Orders or null if not found
 */

const getOrdersByUserId = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(customError('No token provided', 401)); // Unauthorized
  }

  const decoded = decodeToken(token);

  if (!decoded || !decoded.user_id) {
    return next(customError('Invalid token', 401)); // Return an error if the token is invalid
  }

  const userId = decoded.user_id;

  try {
    // Fetch orders by user id
    const orders = await fetchOrdersByUserId(userId, next);
    if (!orders) {
      return next(customError('Orders not found', 404));
    }
    // the orders
    res.status(200).json(orders);
  } catch (e) {
    console.error('getOrdersByUserId error:', e.message);
    return next(customError('getOrdersByUserId error: ' + e.message));
  }
};

/**
 * Fetch orders by status
 * @param req
 * @param res
 * @returns orders by status
 * @throws Error
 * @returns - Orders or null if not found
 */
const getOrdersByStatus = async (req, res, next) => {
  const status = req.params.order_status;
  try {
    // Fetch orders by status
    const orders = await fetchOrdersByStatus(status, next);
    if (!orders) {
      return next(customError('Orders not found', 404));
    }
    // the orders
    res.status(200).json(orders);
  } catch (e) {
    console.error('getOrdersByStatus error:', e.message);
    return next(customError('getOrdersByStatus error: ' + e.message));
  }
};

/**
 * Create an order
 * @param req
 * @param res
 * @returns created order
 * @throws Error
 * @returns - Order or null if not found
 */

const postOrder = async (req, res) => {
  try {
    const {user_id, customer_name, total_price, order_items, order_type, order_status, general_comment, delivery_address, city, delivery_instructions} =
      req.body;

    validateString(customer_name, 'customer_name');
    validatePositiveNumber(total_price, 'total_price');
    validateString(order_type, 'order_type');
    validateString(order_status, 'order_status');

    if (
      !order_items ||
      !Array.isArray(order_items) ||
      order_items.length === 0
    ) {
      throw new Error('Missing or invalid order_items in the request.');
    }

    // Create an order
    const newOrder = await createOrder(
      user_id,
      customer_name,
      total_price,
      order_type,
      order_status,
      order_items,
      general_comment,
      delivery_address,
      city,
      delivery_instructions
    );

    if (!newOrder) {
      throw new Error('Order not created');
    }

    // the order
    res.status(200).json(newOrder);
  } catch (e) {
    console.error('postOrder error:', e.message);
    throw new Error('postOrder error: ' + e.message);
  }
};

/**
 * Update order status
 * @param req
 * @param res
 * @returns updated order status
 * @throws Error
 */

const putOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.order_id;
    const orderStatus = req.body.order_status;

    // Update order status
    const updatedOrder = await updateOrderStatus(
      orderId,
      orderStatus,
    );

    if (!updatedOrder) {
      return next(customError('Order status not updated', 404));
    }

    // the order status
    res.status(200).json({order_id: orderId, order_status: orderStatus});
  } catch (e) {
    console.error('putOrderStatus error:', e.message);
    return next(customError('putOrderStatus error: ' + e.message));
  }
};

export {
  getAllOrders,
  getOrderById,
  getOrdersByCustomerName,
  getOrdersByUserId,
  getOrdersByStatus,
  postOrder,
  putOrderStatus,
};
