import express from 'express';
import {
  getAllOrders,
  getOrdersByUserId,
  getOrdersByStatus,
  getOrderById,
  postOrder,
  putOrderStatus,
} from '../controllers/order-controllers.js';
import {validateDeliveryOrder} from '../middlewares/validation.js';
import {authenticateToken, isAdmin} from '../middlewares/authentication.js';
const orderRouter = express.Router();

// order routes
orderRouter.get(
  '/',
  /**
   * @api {get} /order Get all orders
   * @apiName GetOrders
   * @apiGroup all
   * @apiDescription Get all orders
   * @apiPermission token
   *
   * @apiSuccess {Object[]} orders List of orders
   * @apiSuccess {string} orders.order_date Date of the order
   * @apiSuccess {String} orders.order_id ID of the order
   * @apiSuccess {String} orders.order_status Status of the order
   * @apiSuccess {String} orders.customer_name Name of the customer
   * @apiSuccess {Object[]} orders.order_items List of order items
   * @apiSuccess {String} orders.comments Comments of the order
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_type Type of the order
   * @apiSuccess {String} orders.customer_address Address of the customer
   * @apiSuccess {String} orders.city City of the customer
   * @apiSuccess {String} orders.delivery_instructions Delivery instructions
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "orders": [
   * {
   * "order_date": "2021-03-15",
   * "order_id": "1",
   * "order_status": "Pending",
   * "customer_name": "Example User",
   * "order_items": [
   * {
   * "course_name": "Koyto Bliss",
   * "quantity": 2
   * }
   * ],
   * "comments": "Extra sauce",
   * "total_price": 24.90,
   * "order_type": "Delivery",
   * "customer_address": "Some Street 1",
   * "city": "Helsinki",
   * "delivery_instructions": "Ring the doorbell",
   * }
   * ]
   *
   * }
   *
   * @apiError (Error 404) NotFound No orders found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   * "error": {
   * "message": "No orders found",
   * "status": 404
   * }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   * "error": {
   * "message": "Internal server error",
   * "status": 500
   * }
   * }
   */
  authenticateToken,
  getAllOrders,
);

orderRouter.get(
  '/status/:order_status',
  /**
   * @api {get} /order/status/:order_status Get orders by status
   * @apiName GetOrdersByStatus
   * @apiGroup all
   * @apiDescription Get orders by status
   * @apiPermission token
   *
   * @apiParam {String} order_status Status of the order
   *
   * @apiSuccess {Object[]} orders List of orders
   * @apiSuccess {string} orders.order_date Date of the order
   * @apiSuccess {String} orders.order_id ID of the order
   * @apiSuccess {String} orders.order_status Status of the order
   * @apiSuccess {String} orders.customer_name Name of the customer
   * @apiSuccess {Object[]} orders.order_items List of order items
   * @apiSuccess {String} orders.comments Comments of the order
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_type Type of the order
   * @apiSuccess {String} orders.customer_address Address of the customer
   * @apiSuccess {String} orders.city City of the customer
   * @apiSuccess {String} orders.delivery_instructions Delivery instructions
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "orders": [
   * {
   * "order_date": "2021-03-15",
   * "order_id": "1",
   * "order_status": "Pending",
   * "customer_name": "Example User",
   * "order_items": [
   * {
   * "course_name": "Koyto Bliss",
   * "quantity": 2
   * }
   * ],
   * "comments": "Extra sauce",
   * "total_price": 24.90,
   * "order_type": "Delivery",
   * "customer_address": "Some Street 1",
   * "city": "Helsinki",
   * "delivery_instructions": "Ring the doorbell",
   * }
   * ]
   *
   * }
   *
   * @apiError (Error 404) NotFound No orders found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   * "error": {
   * "message": "No orders found",
   * "status": 404
   * }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   * @apiErrorExample Error-Response:
   *
   * HTTP/1.1 500 Internal Server Error
   * {
   * "error": {
   * "message": "Internal server error",
   * "status": 500
   * }
   * }
   */
  authenticateToken,
  getOrdersByStatus,
);
orderRouter.get(
  '/user',
  /**
   * @api {get} /orders/user Get orders by user
   * @apiName GetOrdersByUser
   * @apiGroup all
   * @apiDescription Get orders by user
   * @apiPermission token
   *
   * @apiSuccess {Object[]} orders List of orders
   * @apiSuccess {String} orders.order_id ID of the order
   * @apiSuccess {string} orders.order_date Date of the order
   * @apiSuccess {String} orders.order_type Type of the order
   * @apiSuccess {Object[]} orders.order_items List of order items
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_status Status of the order
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "orders": [
   * {
   * "order_id": "1",
   * "order_date": "2021-03-15",
   * "order_type": "Delivery",
   * "order_items": [
   * {
   * "course_name": "Koyto Bliss",
   * "quantity": 2
   * }
   * ],
   *
   * "total_price": 24.90,
   * "order_status": "Pending"
   * }
   * ]
   *
   * }
   *
   * @apiError (Error 404) NotFound No orders found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   * "error": {
   * "message": "No orders found",
   * "status": 404
   * }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   * "error": {
   * "message": "Internal server error",
   * "status": 500
   * }
   * }
   */
  authenticateToken,
  getOrdersByUserId,
);

orderRouter.get(
  '/:order_id',
  /**
   * @api {get} /order/:order_id Get order by ID
   * @apiName GetOrderById
   * @apiGroup all
   * @apiDescription Get order by ID
   * @apiPermission token
   *
   * @apiParam {String} order_id ID of the order
   *
   * @apiSuccess {String} order_id ID of the order
   * @apiSuccess {String} order_date Date of the order
   * @apiSuccess {String} order_status Status of the order
   * @apiSuccess {String} customer_name Name of the customer
   * @apiSuccess {Object[]} order_items List of order items
   * @apiSuccess {String} comments Comments of the order
   * @apiSuccess {Number} total_price Total price of the order
   * @apiSuccess {String} order_type Type of the order
   * @apiSuccess {String} customer_address Address of the customer
   * @apiSuccess {String} city City of the customer
   * @apiSuccess {String} delivery_instructions Delivery instructions
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "order_id": "1",
   * "order_date": "2021-03-15",
   * "order_status": "Pending",
   * "customer_name": "Example User",
   * "order_items": [
   * {
   * "course_name": "Koyto Bliss",
   * "quantity": 2
   * }
   * ],
   * "comments": "Extra sauce",
   * "total_price": 24.90,
   * "order_type": "Delivery",
   * "customer_address": "Some Street 1",
   * "city": "Helsinki",
   * "delivery_instructions": "Ring the doorbell",
   *
   * }
   *
   * @apiError (Error 404) NotFound No order found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   * "error": {
   * "message": "No order found",
   * "status": 404
   * }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   * @apiErrorExample Error-Response:
   *
   * HTTP/1.1 500 Internal Server Error
   * {
   * "error": {
   * "message": "Internal server error",
   * "status": 500
   * }
   * }
   */
  authenticateToken,
  getOrderById,
);

// apply validation middleware to post route
orderRouter.post(
  '/',
  /**
   * @api {post} /order Create an order
   * @apiName PostOrder
   * @apiGroup all
   * @apiDescription Create an order
   * @apiPermission none
   *
   * @apiParam {String} order_date Date of the order
   * @apiParam {String} order_items.course_id ID of the course
   * @apiParam {String} order_status Status of the order
   * @apiParam {String} customer_name Name of the customer
   * @apiParam {Object[]} order_items List of order items
   * @apiParam {String} comments Comments of the order
   * @apiParam {Number} total_price Total price of the order
   * @apiParam {String} order_type Type of the order
   * @apiParam {String} customer_address Address of the customer
   * @apiParam {String} city City of the customer
   * @apiParam {String} delivery_instructions Delivery instructions
   *
   * @apiSuccess {String} message Success message
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 201 Created
   * {
   * "message": "Order created"
   * }
   *
   * @apiError (Error 400) BadRequest Invalid order
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   * {
   * "error": {
   * "message": "Invalid order",
   * "status": 400
   * }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   * "error": {
   * "message": "Internal server error",
   * "status": 500
   * }
   * }
   */
  validateDeliveryOrder,
  postOrder,
);

orderRouter.put(
  '/:order_id',
  /**
   * @api {put} /order/:order_id Update order status
   * @apiName PutOrderStatus
   * @apiGroup all
   * @apiDescription Update order status
   * @apiPermission token
   *
   * @apiParam {String} order_status Status of the order
   *
   * @apiSuccess {String} message Success message
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "message": "Order status updated"
   * }
   *
   * @apiError (Error 400) BadRequest Invalid order status
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   * {
   * "error": {
   * "message": "Invalid order status",
   * "status": 400
   * }
   * }
   */
  authenticateToken,
  isAdmin,
  putOrderStatus,
);

export default orderRouter;