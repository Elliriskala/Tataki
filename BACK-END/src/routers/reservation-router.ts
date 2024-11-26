import express from 'express';
import { getReservations, getReservationById, getReservationsByUserId, postReservation, deleteReservationById, modifyReservationById } from '../controllers/reservation-controllers';
import authenticateToken from '../middlewares/authentication';

const reservationRouter = express.Router();

reservationRouter
.get('/', getReservations)
.post('/', postReservation);

reservationRouter.get('/:reservation_id', authenticateToken, getReservationById);

reservationRouter.get('/:user_id', authenticateToken, getReservationsByUserId);

reservationRouter
.delete('/:reservation_id', authenticateToken, deleteReservationById)
.put('/:reservation_id', authenticateToken, modifyReservationById);

export default reservationRouter;

