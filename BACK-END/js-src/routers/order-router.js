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
   * @apiDescription Get all orders for the authenticated user. Requires an active token for authentication.
   * @apiPermission token
   *
   * @apiSuccess {Object[]} orders List of orders placed by the user
   * @apiSuccess {String} orders.order_date Date when the order was placed
   * @apiSuccess {String} orders.order_id Unique ID of the order
   * @apiSuccess {String} orders.order_status Current status of the order (e.g., Pending, Completed)
   * @apiSuccess {String} orders.customer_name Name of the customer who placed the order
   * @apiSuccess {Object[]} orders.order_items List of items in the order
   * @apiSuccess {String} orders.order_items.course_name Name of the menu item ordered
   * @apiSuccess {Number} orders.order_items.quantity Quantity of the ordered item
   * @apiSuccess {String} orders.comments Additional comments for the order
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_type Type of the order (e.g., Delivery, Pickup)
   * @apiSuccess {String} orders.customer_address Address for delivery (if applicable)
   * @apiSuccess {String} orders.city City of the customer
   * @apiSuccess {String} orders.delivery_instructions Special instructions for delivery
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "orders": [
   *     {
   *       "order_date": "2021-03-15",
   *       "order_id": "1",
   *       "order_status": "Pending",
   *       "customer_name": "Example User",
   *       "order_items": [
   *         {
   *           "course_name": "Koyto Bliss",
   *           "quantity": 2
   *         }
   *       ],
   *       "comments": "Extra sauce",
   *       "total_price": 24.90,
   *       "order_type": "Delivery",
   *       "customer_address": "Some Street 1",
   *       "city": "Helsinki",
   *       "delivery_instructions": "Ring the doorbell"
   *     }
   *   ]
   * }
   *
   * @apiError (Error 404) NotFound No orders found for the user
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No orders found for the user",
   *     "status": 404
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Error occurred while retrieving the orders
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
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
   * @apiDescription Get orders by status for the authenticated user. Requires an active token for authentication.
   * @apiPermission token
   *
   * @apiParam {String} order_status Status of the order (e.g., Pending, Completed, Cancelled)
   *
   * @apiSuccess {Object[]} orders List of orders with the specified status
   * @apiSuccess {String} orders.order_date Date of the order
   * @apiSuccess {String} orders.order_id ID of the order
   * @apiSuccess {String} orders.order_status Status of the order
   * @apiSuccess {String} orders.customer_name Name of the customer
   * @apiSuccess {Object[]} orders.order_items List of items in the order
   * @apiSuccess {String} orders.order_items.course_name Name of the menu item ordered
   * @apiSuccess {Number} orders.order_items.quantity Quantity of the ordered item
   * @apiSuccess {String} orders.comments Additional comments for the order
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_type Type of the order (e.g., Delivery, Pickup)
   * @apiSuccess {String} orders.customer_address Address for delivery (if applicable)
   * @apiSuccess {String} orders.city City of the customer
   * @apiSuccess {String} orders.delivery_instructions Special instructions for delivery
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "orders": [
   *     {
   *       "order_date": "2021-03-15",
   *       "order_id": "1",
   *       "order_status": "Pending",
   *       "customer_name": "Example User",
   *       "order_items": [
   *         {
   *           "course_name": "Koyto Bliss",
   *           "quantity": 2
   *         }
   *       ],
   *       "comments": "Extra sauce",
   *       "total_price": 24.90,
   *       "order_type": "Delivery",
   *       "customer_address": "Some Street 1",
   *       "city": "Helsinki",
   *       "delivery_instructions": "Ring the doorbell"
   *     }
   *   ]
   * }
   *
   * @apiError (Error 404) NotFound No orders found with the specified status for the user
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No orders found with the specified status for the user",
   *     "status": 404
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Error occurred while retrieving the orders
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
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
   * @apiDescription Get orders placed by the authenticated user. Requires a valid token to retrieve user-specific order data.
   * @apiPermission token
   *
   * @apiSuccess {Object[]} orders List of orders placed by the authenticated user
   * @apiSuccess {String} orders.order_id ID of the order
   * @apiSuccess {String} orders.order_date Date the order was placed
   * @apiSuccess {String} orders.order_type Type of the order (e.g., Delivery, Pickup)
   * @apiSuccess {Object[]} orders.order_items List of items in the order
   * @apiSuccess {String} orders.order_items.course_name Name of the menu item ordered
   * @apiSuccess {Number} orders.order_items.quantity Quantity of the ordered item
   * @apiSuccess {Number} orders.total_price Total price of the order
   * @apiSuccess {String} orders.order_status Current status of the order (e.g., Pending, Completed)
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "orders": [
   *     {
   *       "order_id": "1",
   *       "order_date": "2021-03-15",
   *       "order_type": "Delivery",
   *       "order_items": [
   *         {
   *           "course_name": "Koyto Bliss",
   *           "quantity": 2
   *         }
   *       ],
   *       "total_price": 24.90,
   *       "order_status": "Pending"
   *     }
   *   ]
   * }
   *
   * @apiError (Error 404) NotFound No orders found for the authenticated user
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No orders found for the authenticated user",
   *     "status": 404
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error while retrieving orders
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
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
   * @apiDescription Get an order by its ID. Requires authentication via token.
   * @apiPermission token
   *
   * @apiParam {String} order_id ID of the order to retrieve
   *
   * @apiSuccess {String} order_id ID of the order
   * @apiSuccess {String} order_date Date the order was placed
   * @apiSuccess {String} order_status Current status of the order
   * @apiSuccess {String} customer_name Name of the customer
   * @apiSuccess {Object[]} order_items List of items in the order
   * @apiSuccess {String} order_items.course_name Name of the ordered item
   * @apiSuccess {Number} order_items.quantity Quantity of the ordered item
   * @apiSuccess {String} comments Additional comments for the order
   * @apiSuccess {Number} total_price Total price of the order
   * @apiSuccess {String} order_type Type of the order (e.g., Delivery, Pickup)
   * @apiSuccess {String} customer_address Customer's delivery address
   * @apiSuccess {String} city City of the customer
   * @apiSuccess {String} delivery_instructions Special delivery instructions
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "order_id": "1",
   *   "order_date": "2021-03-15",
   *   "order_status": "Pending",
   *   "customer_name": "Example User",
   *   "order_items": [
   *     {
   *       "course_name": "Koyto Bliss",
   *       "quantity": 2
   *     }
   *   ],
   *   "comments": "Extra sauce",
   *   "total_price": 24.90,
   *   "order_type": "Delivery",
   *   "customer_address": "Some Street 1",
   *   "city": "Helsinki",
   *   "delivery_instructions": "Ring the doorbell"
   * }
   *
   * @apiError (Error 404) NotFound No order found with the given order ID
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No order found with the given order ID",
   *     "status": 404
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error while retrieving the order
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
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
   * @apiDescription Create a new order. This endpoint does not require authentication.
   * @apiPermission none
   *
   * @apiParam {String} order_date Date of the order
   * @apiParam {Object[]} order_items List of items in the order
   * @apiParam {String} order_items.course_id ID of the course
   * @apiParam {Number} order_items.quantity Quantity of the ordered item
   * @apiParam {String} order_status Status of the order (e.g., "Pending", "Shipped", etc.)
   * @apiParam {String} customer_name Name of the customer
   * @apiParam {String} comments Comments or special instructions for the order
   * @apiParam {Number} total_price Total price of the order
   * @apiParam {String} order_type Type of the order (e.g., Delivery, Pickup)
   * @apiParam {String} customer_address Address of the customer
   * @apiParam {String} city City of the customer
   * @apiParam {String} delivery_instructions Special instructions for delivery
   *
   * @apiSuccess {String} message Success message
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 201 Created
   * {
   *   "message": "Order created"
   * }
   *
   * @apiError (Error 400) BadRequest Invalid order data (e.g., missing required fields, invalid data types)
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   * {
   *   "error": {
   *     "message": "Invalid order data",
   *     "status": 400
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error during order creation
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
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
   * @apiDescription Update the status of an order. Requires authentication and admin privileges.
   * @apiPermission token
   *
   * @apiParam {String} order_status The new status of the order (e.g., "Pending", "Shipped", "Delivered", etc.)
   *
   * @apiSuccess {String} message Success message
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "Order status updated"
   * }
   *
   * @apiError (Error 400) BadRequest Invalid order status (e.g., unknown status)
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   * {
   *   "error": {
   *     "message": "Invalid order status",
   *     "status": 400
   *   }
   * }
   */
  authenticateToken,
  isAdmin,
  putOrderStatus,
);

export default orderRouter;