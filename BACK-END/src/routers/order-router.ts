import express  from "express";
import { getAllOrders, getOrdersByUserId, getOrderById, getOrdersByStatus, postOrder, putOrderStatus } from "../controllers/order-controllers";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:order_status", getOrdersByStatus);
orderRouter.get("/:order_id", getOrderById);
orderRouter.get("/user/:user_id", getOrdersByUserId);
orderRouter.post("/", postOrder);
orderRouter.put("/:order_id", putOrderStatus);

export default orderRouter;