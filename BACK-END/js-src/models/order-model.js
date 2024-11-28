import {promisePool} from '../database.js';
import {customError} from '../middlewares/error-handlers.js';
/**
 *
 * @returns all orders from the database
 * @returns - Array of orders
 */
const fetchOrders = async (next) => {
  try {
    const sql = `
            SELECT 
        Orders.*, 
        GROUP_CONCAT(CONCAT(OrderItems.course_name, ':', OrderItems.item_quantity)) AS items,
        OrderStatus.status_name AS order_status
    FROM Orders
    LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
    LEFT JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id
    GROUP BY Orders.order_id
    ORDER BY Orders.created_at DESC;
`;
    const [rows] = await promisePool.query(sql);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error('fetchOrders error:', e.message);
    next(customError('Database error: ' + e.message));
    return null;
  }
};

/**
 * fetch orders by order status
 * @param order_status - order status
 * @returns all orders from the database
 * @returns - Array of orders
 */
const fetchOrdersByStatus = async (order_status, next) => {
  try {
    const sql = `
          SELECT 
              Orders.*, 
              GROUP_CONCAT(CONCAT(OrderItems.course_name, ':', OrderItems.item_quantity)) AS items,
              OrderStatus.status_name AS order_status
          FROM Orders
          LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
          LEFT JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id
          WHERE OrderStatus.status_name = ?
          GROUP BY Orders.order_id
          ORDER BY Orders.created_at DESC;
  `;
    const [rows] = await promisePool.query(sql, [order_status]);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error('fetchOrdersByStatus error:', e.message);
    next(customError('Database error: ' + e.message));
    return null;
  }
};

/**
 *
 * @param order_id - order id
 * @returns order from the database
 * @returns - order object with items
 */
const fetchOrderById = async (order_id, next) => {
  try {
    const sql = `
        SELECT 
        Orders.*,
        OrderItems.menu_id,
        OrderItems.course_name,
        OrderItems.item_quantity,
        OrderItems.comment,
        OrderStatus.status_name AS order_status,
        DeliveryDetails.address,
        DeliveryDetails.postal_code,
        DeliveryDetails.delivery_instructions
    FROM Orders
    LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
    LEFT JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id
    LEFT JOIN DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
    WHERE Orders.order_id = ?
    ORDER BY Orders.created_at DESC;
`;
    const [rows] = await promisePool.query(sql, [order_id]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (e) {
    console.error('fetchOrderById error:', e.message);
    next(customError('Database error: ' + e.message));
    return null;
  }
};
/**
 * fetch orders by customer name
 * @param cusr_name - customer name
 * @returns all orders from the database
 * @returns - Array of orders
 */
const fetchOrderByCustomerName = async (customer_name, next) => {
  try {
    const sql = `
    SELECT 
        Orders.*, 
        GROUP_CONCAT(CONCAT(OrderItems.course_name, ':', OrderItems.item_quantity)) AS items,
        OrderStatus.status_name AS order_status,
        DeliveryDetails.address,
        DeliveryDetails.postal_code
    FROM Orders
    LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
    LEFT JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id
    LEFT JOIN DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
    WHERE Orders.customer_name = ?
    GROUP BY Orders.order_id
    ORDER BY Orders.created_at DESC;
`;

    const [rows] = await promisePool.query(sql, [customer_name]);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error('fetchOrderByCustomerName error:', e.message);
    next(customError('Database error: ' + e.message));
    return null;
  }
};

/**
 * creates a new order and associates items with it.
 * @param customer_name - customer name
 * @param total_price - The total price
 * @param order_items - array of orderitems
 * @param order_type - order type
 * @param order_status - order status
 * @returns - order object with items
 */

const createOrder = async (
  customer_name,
  total_price,
  order_type,
  order_status,
  order_items,
  delivery_address = null,
  postal_code = null,
  delivery_instructions = null,
  next,
) => {
  try {
    if (
      !order_items ||
      !Array.isArray(order_items) ||
      order_items.length === 0 ||
      !order_items.every(
        (item) =>
          item.menu_id &&
          typeof item.menu_id === 'number' &&
          typeof item.item_quantity === 'number' &&
          item.item_quantity > 0,
      )
    ) {
      throw new Error('Invalid order_items: Expected a non-empty array.');
    }

    // Fetch status_id from OrderStatus table
    const statusSql = `SELECT status_id FROM OrderStatus WHERE status_name = ?`;
    const [statusResult] = await promisePool.query(statusSql, [order_status]);

    if (!statusResult || statusResult.length === 0) {
      throw new Error(`Invalid order_status: ${order_status}`);
    }
    const order_status_id = statusResult[0].status_id;
    // insert order into orders table
    const orderSql = `
        INSERT INTO orders (customer_name, total_price, order_type, status_id, is_delivery) 
         VALUES (?, ?, ?, ?, ?)
    `;
    const [orderResult] = await promisePool.query(orderSql, [
      customer_name,
      total_price,
      order_type,
      order_status_id,
      order_type === 'Delivery',
    ]);

    // get the order id
    const orderId = orderResult.insertId;

    if (order_type === 'Delivery' && delivery_address) {
      const deliverySql = `
          INSERT INTO DeliveryDetails (order_id, address, postal_code, delivery_instructions)
          VALUES (?, ?, ?, ?)
      `;
      await promisePool.query(deliverySql, [
        orderId,
        delivery_address,
        postal_code,
        delivery_instructions || null,
      ]);
    }

    // insert order items into order_items table
    const orderItemsSql =
      'INSERT INTO orderitems (order_id, menu_id, course_name, item_quantity, comment) VALUES ?';

    const orderItemsValues =
      Array.isArray(order_items) && order_items.length > 0
        ? order_items.map((item) => [
            orderId,
            item.menu_id,
            item.course_name,
            item.item_quantity,
            item.comment || null,
          ])
        : [];

    // insert order items at once

    if (orderItemsValues.length > 0) {
      await promisePool.query(orderItemsSql, [orderItemsValues]);
    } else {
      console.warn('No order items to insert.');
    }

    // fetch the created order, with its items
    const orderWithItemsSql = `
      SELECT 
        Orders.*,
        OrderItems.menu_id,
        OrderItems.course_name,
        OrderItems.item_quantity,
        OrderItems.comment,
        OrderStatus.status_name AS order_status,
        DeliveryDetails.address,
        DeliveryDetails.postal_code,
        DeliveryDetails.delivery_instructions
      FROM Orders
      LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
      LEFT JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id
      LEFT JOIN DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
      WHERE Orders.order_id = ?
      ORDER BY Orders.created_at DESC;
    `;

    const [orderItemsResult] = await promisePool.query(orderWithItemsSql, [
      orderId,
    ]);

    if (!orderItemsResult || orderItemsResult.length === 0) {
      throw new Error('Failed to fetch the created order.');
    }

    const order = {
      order_id: orderItemsResult[0].order_id,
      customer_name: orderItemsResult[0].customer_name,
      total_price: orderItemsResult[0].total_price,
      order_type: orderItemsResult[0].order_type,
      order_status: orderItemsResult[0].order_status,
      delivery_details:
        order_type === 'Delivery'
          ? {
              address: orderItemsResult[0].address,
              postal_code: orderItemsResult[0].postal_code,
              instructions: orderItemsResult[0].delivery_instructions || null,
            }
          : null,
      order_items: orderItemsResult.map((item) => ({
        menu_id: item.menu_id,
        course_name: item.course_name,
        item_quantity: item.item_quantity,
        comment: item.comment || null,
      })),
      created_at: orderItemsResult[0].created_at,
    };
  
    return order;

  } catch (e) {
    console.error('createOrder error:', e.message);
    next(customError('Database error: ' + e.message));
    return null;
  }
};

/**
 * update order status
 * @param order_id - order id
 * @param order_status - order status
 * @returns - true if the order status is updated
 */

const updateOrderStatus = async (order_id, order_status, next) => {
  try {
    const sql = `
    UPDATE orders 
    SET status_id = (SELECT status_id FROM OrderStatus WHERE status_name = ?) 
    WHERE order_id = ?
`;
    const [result] = await promisePool.query(sql, [order_status, order_id]);
    return result.affectedRows > 0;
  } catch (e) {
    console.error('updateOrderStatus error:', e.message);
    next(customError('Database error: ' + e.message));
    return false;
  }
};

export {
  fetchOrderById,
  fetchOrders,
  createOrder,
  fetchOrderByCustomerName,
  fetchOrdersByStatus,
  updateOrderStatus,
};
