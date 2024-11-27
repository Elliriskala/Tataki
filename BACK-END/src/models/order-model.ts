import { promisePool } from "../database";
import { Order, OrderItem } from "../utils/interfaces";
import { customError } from "../middlewares/error-handlers";

/**
 *
 * @returns all orders from the database
 * @returns {Promise<Order[]>} - Array of orders
 */

const fetchOrders = async (
  next: (err: Error) => void
): Promise<Order[] | null> => {
  try {
    const sql = `
            SELECT Orders.*,
                   GROUP_CONCAT(OrderItems.course_name, ':', OrderItems.item_quantity) AS items
            FROM Orders
            LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
            GROUP BY Orders.order_id
            ORDER BY Orders.created_at DESC;
        `;
    const [rows]: any = await promisePool.query(sql);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error("fetchOrders error:", (e as Error).message);
    next(customError("Database error: " + (e as Error).message));
    return null;
  }
};

/**
 * fetch orders by order status
 * @param order_status - order status
 * @returns all orders from the database
 * @returns {Promise<Order[]>} - Array of orders
 */

const fetchOrdersByStatus = async (
  order_status: string,
  next: (err: Error) => void
): Promise<Order[] | null> => {
  try {
    const sql = `
                SELECT Orders.*,
                     GROUP_CONCAT(Concat(OrderItems.course_name, ':', OrderItems.item_quantity))AS items
                FROM Orders
                LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
                WHERE Orders.order_status = ?
                GROUP BY Orders.order_id
                ORDER BY Orders.created_at DESC;
            `;
    const [rows]: any = await promisePool.query(sql, [order_status]);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error("fetchOrdersByStatus error:", (e as Error).message);
    next(customError("Database error: " + (e as Error).message));
    return null;
  }
};

/**
 *
 * @param order_id - order id
 * @returns order from the database
 * @returns {Promise<Order | null>} - order object with items
 */

const fetchOrderById = async (
  order_id: number,
  next: (err: Error) => void
): Promise<Order | null> => {
  try {
    const sql = `
            SELECT Orders.*,
                   OrderItems.menu_id,
                   OrderItems.course_name,
                   OrderItems.item_quantity,
                   OrderItems.comment
            FROM Orders
            LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
            WHERE Orders.order_id = ?
            ORDER BY Orders.created_at DESC;
        `;
    const [rows]: any = await promisePool.query(sql, [order_id]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (e) {
    console.error("fetchOrderById error:", (e as Error).message);
    next(customError("Database error: " + (e as Error).message));
    return null;
  }
};

/**
 * fetch orders by user id
 * @param user_id - user id
 * @returns all orders from the database
 * @returns {Promise<Order[]>} - Array of orders
 */

const fetchOrderByUserId = async (
  user_id: number,
  next: (err: Error) => void
): Promise<Order[] | null> => {
  try {
    const sql = `SELECT Orders.*,
                  GROUP_CONCAT(Concat(OrderItems.course_name, ':', OrderItems.item_quantity)) AS items 
                  FROM Orders 
                  LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id 
                  WHERE Orders.user_id = ? 
                  GROUP BY Orders.order_id 
                  ORDER BY Orders.created_at DESC; 
              `;
    const [rows]: any = await promisePool.query(sql, [user_id]);
    if (rows && rows.length > 0) {
      return rows;
    }
    return null;
  } catch (e) {
    console.error("fetchUserOrders error:", (e as Error).message);
    next(customError("Database error: " + (e as Error).message));
    return null;
  }
};

/**
 *
 * @param user_id - user id
 * @param order_items - array of orderitems
 * @param Order_type - order type
 * @paran OrderStatus - order status
 * @returns {Promise<OrderItem | null>} - order object with items
 */

const createOrder = async (
  user_id: number,
  order_items: OrderItem[],
  order_type: string,
  order_status: string,
  next: (err: Error) => void
): Promise<Order | null> => {
  try {
    // insert order into orders table
    const orderSql =
      "INSERT INTO orders (user_id, order_type, order_status) VALUES (?, ?, ?)";
    const [orderResult]: any = await promisePool.query(orderSql, [
      user_id,
      order_type,
      order_status,
    ]);

    // get the order id
    const orderId = orderResult.insertId;

    // insert order items into order_items table
    const orderItemsSql =
      "INSERT INTO order_items (order_id, menu_id, course_name item_quantity, comment) VALUES ?";

    const orderItemsValues = order_items.map((item) => [
      orderId,
      item.menu_id,
      item.course_name,
      item.item_quantity,
      item.comment || null,
    ]);

    // insert order items at once

    await promisePool.query(orderItemsSql, [orderItemsValues]);

    // fetch the created order, with its items
    const orderWithItemsSql = `
            SELECT Orders.*,
                   OrderItems.menu_id,
                   OrederItems.course_name,
                   OrderItems.item_quantity,
                   OrderItems.comment
            FROM Orders
            LEFT JOIN OrderItems ON Orders.order_id = OrderItems.order_id
            WHERE Orders.order_id = ?
            ORDER BY Orders.created_at DESC;
        `;

    const [orderItemsResult]: any = await promisePool.query(orderWithItemsSql, [
      orderId,
    ]);

    const order: Order = {
      order_id: orderItemsResult[0].order_id,
      user_id: orderItemsResult[0].user_id,
      order_type: orderItemsResult[0].order_type,
      order_status: orderItemsResult[0].order_status,
      order_items: orderItemsResult.map((item: any) => ({
        menu_id: item.menu_id,
        item_quantity: item.item_quantity,
        comment: item.comment,
      })),
      created_at: orderItemsResult[0].created_at,
    };

    return order;
  } catch (e) {
    console.error("createOrder error:", (e as Error).message);
    next(customError("Database error: " + (e as Error).message));
    return null;
  }
};

export {
  fetchOrderById,
  fetchOrders,
  createOrder,
  fetchOrderByUserId,
  fetchOrdersByStatus,
};
