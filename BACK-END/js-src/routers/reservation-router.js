import express from 'express';
import { getReservations, getReservationById, getReservationsByUserId, validateAndAddReservation, deleteReservationById, modifyReservationById } from '../controllers/reservation-controllers.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { validateAvailability } from '../controllers/reservation-controllers.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const reservationRouter = express.Router();
reservationRouter
    .get('/',
        /**
         * @api {get} /reservation Get all reservations
         * @apiName GetReservations
         * @apiGroup token
         * @apiDescription Retrieve a list of all reservations in the system.
         * @apiPermission none
         *  
         * @apiSuccess {Object[]} reservations List of all reservations.
         * @apiSuccess {String} reservations.reservation_id ID of the reservation.
         * @apiSuccess {String} reservations.reservation_date Date of the reservation.
         * @apiSuccess {String} reservations.reservation_time Time of the reservation.
         * @apiSuccess {Number} reservations.guests Number of guests for the reservation.
         * @apiSuccess {String} reservations.email Email address of the person who made the reservation.
         * @apiSuccess {String} reservations.full_name Full name of the person who made the reservation.
         * @apiSuccess {String} reservations.phone_number Phone number of the person who made the reservation.
         * 
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         *   "reservations": [
         *     {
         *       "reservation_id": "1",
         *       "reservation_date": "2021-03-15",
         *       "reservation_time": "12:00",
         *       "guests": 2,
         *       "email": "user@gmail.com",
         *       "full_name": "User Name",
         *       "phone_number": "123456789"
         *     }
         *   ]
         * }
         *  
         * @apiError (Error 404) NotFound No reservations found in the system.
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   "error": {
         *     "message": "No reservations found",
         *     "status": 404
         *   }
         * }
         * 
         * @apiError (Error 500) InternalServerError Internal server error occurred.
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
         getReservations)
    .get('/times',
        /**
         * @api {get} /reservation/times Get available reservation times
         * @apiName GetReservationTimes
         * @apiGroup all
         * @apiDescription Retrieve available reservation times for a restaurant on a specific date.
         * @apiPermission none
         * 
         * @apiParam {String} reservation_date Date of the reservation in YYYY-MM-DD format.
         * 
         * @apiSuccess {Object[]} times List of available reservation times.
         * @apiSuccess {String} times.time Available time for reservations.
         * 
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         *   "times": [
         *     "10:00",
         *     "12:00",
         *     "13:00",
         *     "15:00",
         *     "17:00"
         *   ]
         * }
         * 
         * @apiError (Error 400) BadRequest Invalid date format provided.
         * @apiErrorExample Error-Response:
         * HTTP/1.1 400 Bad Request
         * {
         *   "error": {
         *     "message": "Invalid date format. Please use YYYY-MM-DD.",
         *     "status": 400
         *   }
         * }
         * 
         * @apiError (Error 404) NotFound No available times for the selected date.
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   "error": {
         *     "message": "No available times for the selected date.",
         *     "status": 404
         *   }
         * }
         * 
         * @apiError (Error 500) InternalServerError Internal server error occurred.
         * @apiErrorExample Error-Response:
         * HTTP/1.1 500 Internal Server Error
         * {
         *   "error": {
         *     "message": "Internal server error",
         *     "status": 500
         *   }
         * }
         */
         validateAvailability)
    .post('/',
        /**
         * @api {post} /reservation Add a reservation
         * @apiName AddReservation
         * @apiGroup all
         * @apiDescription Add a reservation to the system, either for logged-in or non-logged-in users.
         * @apiPermission none
         * 
         * @apiParam {String} restaurant_id ID of the restaurant.
         * @apiParam {String} reservation_date Date of the reservation in YYYY-MM-DD format.
         * @apiParam {String} reservation_time Time of the reservation (HH:MM).
         * @apiParam {Number} guests Number of guests for the reservation (2 to 8).
         * @apiParam {String} email Email address of the user making the reservation.
         * @apiParam {String} full_name Full name of the user.
         * @apiParam {String} phone_number Phone number of the user.
         * 
         * @apiSuccess {String} message Success message indicating the reservation was added.
         * 
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         *   "message": "Reservation added successfully"
         * }
         * 
         * @apiError (Error 400) BadRequest Invalid reservation details, including exceeding the maximum number of guests or invalid input format.
         * @apiErrorExample Error-Response:
         * HTTP/1.1 400 Bad Request
         * {
         *   "error": {
         *     "message": "You have reached the maximum number of active reservations",
         *     "status": 400
         *   }
         * }
         */
        body('reservation_date').isString(),
        body('reservation_time').isString(),
        body('guests').isNumeric({min: 1, max: 10}),
        body('email').isEmail().isLength({min: 5, max: 50}),
        body('full_name').isString().isLength({min: 5, max: 50}),
        body('phone_number').isString().isLength({min: 5, max: 50}),
        validationErrorHandler,
        validateAndAddReservation);


reservationRouter.get('/id/:reservation_id', authenticateToken, getReservationById);


reservationRouter.get('/user',
    /**
     * @api {get} /reservation/user Get reservations by user ID
     * @apiName GetReservationsByUserId
     * @apiGroup token
     * @apiDescription Get all reservations for the authenticated user.
     * @apiPermission token
     * 
     * @apiSuccess {Object[]} reservations List of reservations associated with the user.
     * @apiSuccess {String} reservations.reservation_id ID of the reservation.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "reservations": [
     *     {
     *       "reservation_id": "1",
     *       "reservation_date": "2021-03-15",
     *       "reservation_time": "12:00",
     *       "guests": 2,
     *       "email": "person@gmail.com",
     *       "full_name": "Person Name",
     *       "phone_number": "123456789"
     *     }
     *   ]
     * }
     * 
     * @apiError (Error 404) NotFound No reservations found for the authenticated user.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *   "error": {
     *     "message": "No reservations found for this user",
     *     "status": 404
     *   }
     * }
     * 
     * @apiError (Error 500) InternalServerError Internal server error occurred.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "error": {
     *     "message": "Internal server error",
     *     "status": 500
     *   }
     * }
     */
     authenticateToken, getReservationsByUserId);


reservationRouter
    .delete('/:reservation_id', authenticateToken, deleteReservationById)
    .put('/:reservation_id', authenticateToken, modifyReservationById);


export default reservationRouter;
