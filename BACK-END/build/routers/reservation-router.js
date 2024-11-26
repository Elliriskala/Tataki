"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controllers_1 = require("../controllers/reservation-controllers");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const reservationRouter = express_1.default.Router();
reservationRouter
    .get('/', reservation_controllers_1.getReservations)
    .post('/', reservation_controllers_1.postReservation);
reservationRouter.get('/:reservation_id', authentication_1.default, reservation_controllers_1.getReservationById);
reservationRouter.get('/:user_id', authentication_1.default, reservation_controllers_1.getReservationsByUserId);
reservationRouter
    .delete('/:reservation_id', authentication_1.default, reservation_controllers_1.deleteReservationById)
    .put('/:reservation_id', authentication_1.default, reservation_controllers_1.modifyReservationById);
exports.default = reservationRouter;
//# sourceMappingURL=reservation-router.js.map