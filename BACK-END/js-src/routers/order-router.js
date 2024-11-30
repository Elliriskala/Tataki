import express from "express";
import { getAllOrders, getOrdersByCustomerName, getOrdersByUserId, getOrderById, getOrdersByStatus, postOrder, putOrderStatus } from "../controllers/order-controllers.js";
const orderRouter = express.Router();


orderRouter.get("/", getAllOrders);
orderRouter.get("/status/:order_status", getOrdersByStatus);
orderRouter.get("/:order_id", getOrderById);
orderRouter.get("/customer/:customer_name", getOrdersByCustomerName);
orderRouter.get("/user/:user_id", getOrdersByUserId);
orderRouter.post("/", postOrder);
orderRouter.put("/:order_id", putOrderStatus);

export default orderRouter;
