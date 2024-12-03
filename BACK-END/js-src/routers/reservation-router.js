import express from 'express';
import { getReservations, getReservationById, getReservationsByUserId, validateAndAddReservation, deleteReservationById, modifyReservationById } from '../controllers/reservation-controllers.js';
import authenticateToken from '../middlewares/authentication.js';
import { validateAvailability } from '../controllers/reservation-controllers.js';
const reservationRouter = express.Router();
reservationRouter
    .get('/', getReservations)
    .get('/times', validateAvailability)
    .post('/', validateAndAddReservation);


reservationRouter.get('/:reservation_id', authenticateToken, getReservationById);


reservationRouter.get('/user/:user_id', authenticateToken, getReservationsByUserId);


reservationRouter
    .delete('/:reservation_id', authenticateToken, deleteReservationById)
    .put('/:reservation_id', authenticateToken, modifyReservationById);


export default reservationRouter;
