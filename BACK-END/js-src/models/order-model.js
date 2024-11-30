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
    console.log('Validating order_status:', order_status);
    if (typeof order_status !== 'string') {
      throw new Error('Invalid order_status: Must be a string');
    }

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
    return rows.length > 0 ? rows : [];
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
    Orders.order_id,
    Orders.customer_name,
    Orders.total_price,
    Orders.order_type,
    Orders.general_comment,
    Orders.created_at,
    Orders.is_delivery,
    OrderStatus.status_name AS order_status,
    GROUP_CONCAT(
        CONCAT(OrderItems.course_name, ' (x', OrderItems.item_quantity, ')') 
        SEPARATOR ', '
    ) AS order_items,
    DeliveryDetails.delivery_address,
    DeliveryDetails.postal_code,
    DeliveryDetails.delivery_instructions
FROM 
    Orders
LEFT JOIN 
    OrderStatus ON Orders.status_id = OrderStatus.status_id
LEFT JOIN 
    OrderItems ON Orders.order_id = OrderItems.order_id
LEFT JOIN 
    DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
WHERE 
    Orders.order_id = ?
GROUP BY 
    Orders.order_id, Orders.customer_name, Orders.total_price, Orders.order_type, 
    Orders.general_comment, OrderStatus.status_name, DeliveryDetails.delivery_address, 
    DeliveryDetails.postal_code, DeliveryDetails.delivery_instructions
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
 * @param customer_name - customer name
 * @returns all orders from the database
 * @returns - Array of orders
 */
const fetchOrderByCustomerName = async (customer_name, next) => {
  try {
    const sql = `
    SELECT 
    Orders.order_id,
    Orders.customer_name,
    Orders.total_price,
    Orders.order_type,
    Orders.general_comment,
    Orders.created_at,
    Orders.is_delivery,
    OrderStatus.status_name AS order_status,
    GROUP_CONCAT(
        CONCAT(OrderItems.course_name, ' (x', OrderItems.item_quantity, ')') 
        SEPARATOR ', '
    ) AS order_items,
    DeliveryDetails.delivery_address,
    DeliveryDetails.postal_code,
    DeliveryDetails.delivery_instructions
FROM 
    Orders
LEFT JOIN 
    OrderStatus ON Orders.status_id = OrderStatus.status_id
LEFT JOIN 
    OrderItems ON Orders.order_id = OrderItems.order_id
LEFT JOIN 
    DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
WHERE 
    Orders.order_id = ?
GROUP BY 
    Orders.order_id, Orders.customer_name, Orders.total_price, Orders.order_type, 
    Orders.general_comment, OrderStatus.status_name, DeliveryDetails.delivery_address, 
    DeliveryDetails.postal_code, DeliveryDetails.delivery_instructions
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
 * fetch orders by user id
 * @param user_id - user id
 * @returns all orders from the database associated with the user
 * @returns - Array of orders 
 * @returns - null if no orders found
 */

const fetchOrdersByUserId = async (user_id, next) => {
  try {
    const sql = `
    SELECT 
    Orders.order_id,
    Orders.customer_name,
    Orders.total_price,
    Orders.order_type,
    Orders.general_comment,
    Orders.created_at,
    Orders.is_delivery,
    OrderStatus.status_name AS order_status,
    GROUP_CONCAT(
        CONCAT(OrderItems.course_name, ' (x', OrderItems.item_quantity, ')') 
        SEPARATOR ', '
    ) AS order_items,
    DeliveryDetails.delivery_address,
    DeliveryDetails.postal_code,
    DeliveryDetails.delivery_instructions
FROM 
    Orders
LEFT JOIN 
    OrderStatus ON Orders.status_id = OrderStatus.status_id
LEFT JOIN 
    OrderItems ON Orders.order_id = OrderItems.order_id
LEFT JOIN 
    DeliveryDetails ON Orders.order_id = DeliveryDetails.order_id
WHERE 
    Orders.user_id = ?
GROUP BY 
    Orders.order_id, Orders.customer_name, Orders.total_price, Orders.order_type, 
    Orders.general_comment, OrderStatus.status_name, DeliveryDetails.delivery_address, 
    DeliveryDetails.postal_code, DeliveryDetails.delivery_instructions
    ORDER BY Orders.created_at DESC;
`;

    const [rows] = await promisePool.query(sql, [user_id]);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error('fetchOrdersByUserId error:', e.message);
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
  user_id = null,
  customer_name,
  total_price,
  order_type,
  order_status,
  order_items,
  general_comment = null,
  delivery_address = null,
  postal_code = null,
  delivery_instructions = null,
) => {
  try {
    // Validate inputs
    if (!customer_name || typeof customer_name !== 'string') {
      throw new Error('Invalid customer_name');
    }
    if (!total_price || typeof total_price !== 'number') {
      throw new Error('Invalid total_price');
    }
    if (!Array.isArray(order_items) || order_items.length === 0) {
      throw new Error('Invalid order_items');
    }

    // Fetch status_id from OrderStatus table
    const statusSql = `SELECT status_id FROM OrderStatus WHERE status_name = ?`;
    const [statusResult] = await promisePool.query(statusSql, [order_status]);

    console.log('Order status:', order_status);
    console.log('Status result:', statusResult);

    if (!statusResult || statusResult.length === 0) {
      throw new Error(`Invalid order_status: ${order_status}`);
    }
    const order_status_id = statusResult[0].status_id;
    // insert order into orders table
    const orderSql = `
        INSERT INTO orders (user_id, customer_name, total_price, order_type, status_id, is_delivery, general_comment) 
         VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    console.log({
      user_id,
      customer_name,
      total_price,
      order_type,
      order_status_id,
      is_delivery: order_type.toLowerCase() === 'delivery',
      general_comment: general_comment || null,
      delivery_address: delivery_address,
      postal_code: postal_code,
      delivery_instructions: delivery_instructions || null,
    });

    const [orderResult] = await promisePool.query(orderSql, [
      user_id || null,
      customer_name || 'Anonymous',
      total_price || 0,
      order_type || 'Pickup',
      order_status_id || 1,
      order_type.toLowerCase() === 'delivery',
      general_comment || null,
    ]);

    // get the order id
    const orderId = orderResult.insertId;

    if (order_type.toLowerCase() === 'delivery') {
      const deliverySql = `
          INSERT INTO DeliveryDetails (order_id, delivery_address, postal_code, delivery_instructions)
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
      'INSERT INTO orderitems (order_id, menu_id, course_name, item_quantity) VALUES ?';

    const orderItemsValues = order_items.map((item) => [
      orderId,
      item.menu_id,
      item.course_name,
      item.item_quantity,
    ]);

    console.log('Order items values:', orderItemsValues);

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
        OrderStatus.status_name AS order_status,
        DeliveryDetails.delivery_address,
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
      user_id: orderItemsResult[0].user_id,
      customer_name: orderItemsResult[0].customer_name,
      total_price: orderItemsResult[0].total_price,
      order_type: orderItemsResult[0].order_type,
      order_status: orderItemsResult[0].order_status,
      delivery_details:
        order_type === 'Delivery'
          ? {
              address: orderItemsResult[0].delivery_address,
              postal_code: orderItemsResult[0].postal_code,
              instructions: orderItemsResult[0].delivery_instructions || null,
            }
          : null,
      order_items: orderItemsResult.map((item) => ({
        menu_id: item.menu_id,
        course_name: item.course_name,
        item_quantity: item.item_quantity,
      })),
      general_comment: orderItemsResult[0].general_comment,
      created_at: orderItemsResult[0].created_at,
    };

    return order;
  } catch (e) {
    console.error('createOrder error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

/**
 * update order status
 * @param order_id - order id
 * @param order_status - order status
 * @returns - true if the order status is updated
 */

const updateOrderStatus = async (order_id, order_status) => {
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
    throw new Error('Database error: ' + e.message);
  }
};

export {
  fetchOrderById,
  fetchOrders,
  createOrder,
  fetchOrderByCustomerName,
  fetchOrdersByUserId,
  fetchOrdersByStatus,
  updateOrderStatus,
};