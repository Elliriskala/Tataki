import express from 'express';
import { getReservations, getReservationById, getReservationsByUserId, validateAndAddReservation, deleteReservationById, modifyReservationById } from '../controllers/reservation-controllers.js';
import authenticateToken from '../middlewares/authentication.js';
import { validateAvailability } from '../controllers/reservation-controllers.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const reservationRouter = express.Router();
reservationRouter
    .get('/', getReservations)
    .get('/times', validateAvailability)
    .post('/',
        body('reservation_date').isString(),
        body('reservation_time').isString(),
        body('guests').isNumeric(),
        body('email').isEmail(),
        body('full_name').isString(),
        body('phone_number').isString(),
        validationErrorHandler,
        validateAndAddReservation);


reservationRouter.get('/id/:reservation_id', authenticateToken, getReservationById);


reservationRouter.get('/user', authenticateToken, getReservationsByUserId);


reservationRouter
    .delete('/:reservation_id', authenticateToken, deleteReservationById)
    .put('/:reservation_id', authenticateToken, modifyReservationById);


export default reservationRouter;
