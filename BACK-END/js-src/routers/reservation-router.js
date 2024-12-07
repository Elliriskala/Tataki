import express from 'express';
import { getReservations, getReservationById, getReservationsByUserId, validateAndAddReservation, deleteReservationById, modifyReservationById } from '../controllers/reservation-controllers.js';
import authenticateToken from '../middlewares/authentication.js';
import { validateAvailability } from '../controllers/reservation-controllers.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const reservationRouter = express.Router();
reservationRouter
    .get('/',
        /**
         * @api {get} /reservation Get all reservations
         * @apiName GetReservations
         * @apiGroup all
         * @apiDescription Get all reservations
         * @apiPermission none
         *  
         * @apiSuccess {Object[]} reservations List of reservations
         * @apiSuccess {String} reservations.reservation_id ID of the reservation
         * 
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         * "reservations": [
         * {
         * "reservation_id": "1",
         * "reservation_date": "2021-03-15",
         * "reservation_time": "12:00",
         * "guests": 2,
         * "email": "user@gmail.com",
         * "full_name": "User",
         * "phone_number": "123456789"
         * }
         * 
         * ]
         * }
         *  
         * @apiError (Error 404) NotFound No reservations found
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         * "error": {
         * "message": "No reservations found",
         * "status": 404
         * }
         * }
         * 
         * @apiError (Error 500) InternalServerError Internal server error
         * @apiErrorExample Error-Response:
         * HTTP/1.1 500 Internal Server Error
         * {
         * "error": {
         * "message": "Internal server error",
         * "status": 500
         * }
         * 
         * }
         *
         */
         getReservations)
    .get('/times',
        /**
         * @api {get} /reservation/times Get available reservation times
         * @apiName GetReservationTimes
         * @apiGroup all
         * @apiDescription Get available reservation times for a restaurant on a specific date
         * @apiPermission none
         * 
         * @apiParam {String} reservation_date Date of the reservation
         * 
         * @apiSuccess {Object[]} times List of available times
         * @apiSuccess {String} times.time Time of the reservation
         * 
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         * "times": [
         * "10:00",
         * "12:00",
         * "13:00",
         * "15:00",
         * "17:00"
         * ]
         * }
         * 
         * @apiError (Error 400) BadRequest The request was invalid
         * @apiErrorExample Error-Response:
         * HTTP/1.1 400 Bad Request
         * {
         * "error": {
         * "message": "Invalid date",
         * "status": 400
         * }
         * }
         * 
         * @apiError (Error 404) NotFound No available times
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         * "error": {
         * "message": "No available times",
         * "status": 404
         * }
         * }
         * 
         * @apiError (Error 500) InternalServerError Internal server error
         * @apiErrorExample Error-Response:
         * HTTP/1.1 500 Internal Server Error
         * {
         * "error": {
         * "message": "Internal server error",
         * "status": 500
         * }
         * 
         */
         validateAvailability)
    .post('/',
        /**
         * @api {post} /reservation Add a reservation
         * @apiName AddReservation
         * @apiGroup all
         * @apiDescription Add a reservation, for both logged in and non-logged in users
         * @apiPermission none
         * 
         * @apiParam {String} restaurant_id ID of the restaurant
         * @apiParam {String} reservation_date Date of the reservation
         * @apiParam {String} reservation_time Time of the reservation
         * @apiParam {Number} guests Number of guests
         * @apiParam {String} email Email of the user
         * @apiParam {String} full_name Full name of the user
         * @apiParam {String} phone_number Phone number of the user
         * 
         * @apiSuccess {String} message Success message
         * 
         * @apiSuccessExample Success-Response:
         *  HTTP/1.1 200 OK
         * {
         * "message": "Reservation added successfully"
         * }
         * 
         * @apiError (Error 400) BadRequest The request was invalid
         * @apiErrorExample Error-Response:
         *  HTTP/1.1 400 Bad Request
         * {
         * "error": {
         * "message": "You have reached the maximum number of active reservations",
         * "status": 400
         * }
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
     * @apiDescription Get reservations by user ID
     * @apiPermission token
     * 
     * @apiSuccess {Object[]} reservations List of reservations
     * @apiSuccess {String} reservations.reservation_id ID of the reservation
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "reservations": [
     * {
     * "reservation_id": "1",
     * "reservation_date": "2021-03-15",
     * "reservation_time": "12:00",
     * "guests": 2,
     * "email": "person@gmail.com",
     * "full_name": "Person",
     * "phone_number": "123456789"
     * }
     * ]
     * }
     * 
     * @apiError (Error 404) NotFound No reservations found
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     * "error": {
     * "message": "No reservations found",
     * "status": 404
     * }
     * 
     * }
     * 
     * @apiError (Error 500) InternalServerError Internal server error
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     * "error": {
     * "message": "Internal server error",
     * "status": 500
     * }
     * 
     */
     authenticateToken, getReservationsByUserId);


reservationRouter
    .delete('/:reservation_id', authenticateToken, deleteReservationById)
    .put('/:reservation_id', authenticateToken, modifyReservationById);


export default reservationRouter;
