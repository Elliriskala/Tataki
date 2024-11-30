import { fetchReservations, fetchReservationById, fetchReservationsByUserId, addReservation, deleteReservation, modifyReservation, checkAvailability } from '../models/reservation-models.js';
import { customError } from '../middlewares/error-handlers.js';
/**
 *
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const getReservations = async (_req, res) => {
    try {
        const reservations = await fetchReservations();
        res.json(reservations);
    }
    catch (e) {
        console.error('getReservations error:', e.message);
        throw new Error('getReservations error: ' + e.message);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns reservation with the given reservation_id
 * @throws Error
 * @returns {Promise<void>} - Reservation object or null if not found
 */
const getReservationById = async (req, res) => {
    const reservation_id = Number(req.params.reservation_id);
    try {
        const reservation = await fetchReservationById(reservation_id);
        res.json(reservation);
    }
    catch (e) {
        console.error('getReservationById error:', e.message);
        throw new Error('getReservationById error: ' + e.message);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns reservations with the given user_id
 * @throws Error
 * @returns {Promise<void>} - Reservation object or null if not found
 */
const getReservationsByUserId = async (req, res, next) => {
    const user_id = Number(req.params.user_id);
    try {
        const reservations = await fetchReservationsByUserId(user_id);
        res.json(reservations);
    }
    catch (e) {
        console.error('getReservationsByUserId error:', e.message);
        next(e);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the newly created reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the newly created reservation
 */
const validateAndAddReservation = async (req, res, next) => {
    const { user_id, reservation_date, email, reservation_time, full_name, phone_number, guests } = req.body;  // Get the data from the request body

    if (!reservation_date || !reservation_time || !guests || !full_name || !phone_number || !email) {
        console.log('Missing required fields');
        return next(customError('Missing required fields', 400));
    }

    try {
        // First, check if the requested time and date are available
        const available = await checkAvailability(reservation_date, guests);

        if (available && available.length > 0) {
            // If availability is found, add the reservation
            const newReservation = { user_id, reservation_date, reservation_time, full_name, phone_number, email, guests };
            const result = await addReservation(newReservation);
            if (result.success) {
                res.status(200).json({ message: 'Reservation successfully added' });
            } else {
                console.log('Error adding reservation:', result.message);
                res.status(500).json({ message: result.message });
            }
        } else {
            res.status(404).json({ message: 'No availability' });
        }
    } catch (error) {
        console.error('Error processing reservation:', error.message);
        return next(customError('Error processing reservation', 500));
    }
};

/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the deleted reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the deleted reservation
 */
const deleteReservationById = async (req, res, next) => {
    const reservation_id = Number(req.params.reservation_id);
    try {
        const result = await deleteReservation(reservation_id);
        if (result) {
            res.status(200).json({ message: 'Reservation deleted: ', id: { reservation_id } });
        }
        else {
            res.status(500).json({ message: 'Reservation not deleted' });
        }
    }
    catch (e) {
        console.error('deleteReservationById error:', e.message);
        next(e);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the modified reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the modified reservation
 */
const modifyReservationById = async (req, res, next) => {
    const reservation_id = Number(req.params.reservation_id);
    const newReservation = {
        user_id: req.body.user_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        guests: req.body.guests
    };
    try {
        const result = await modifyReservation(reservation_id, newReservation);
        if (result) {
            res.status(200).json({ message: 'Reservation modified: ', id: { reservation_id } });
        }
        else {
            res.status(500).json({ message: 'Reservation not modified' });
        }
    }
    catch (e) {
        console.error('modifyReservationById error:', e.message);
        next(e);
    }
};


const validateAvailability = async (req, res, next) => {
    const { date, guests } = req.query;

    // Ensure both date and guests are provided in the query
    if (!date || !guests) {
        return next(customError('Missing date or number of guests', 400));
    }

    try {
        // Fetch available times based on date and guests
        const available = await checkAvailability(date, guests);

        // If availability is found, return the available times
        if (available && available.length > 0) {
            const availableTimes = available.map(row => row.reservation_time);
            return res.status(200).json({ availableTimes });
        } else {
            return res.status(404).json({ message: 'No availability' });
        }
    } catch (e) {
        console.error('validateAvailability error:', e.message);
        next(e);
    }
};


export { getReservations, getReservationById, getReservationsByUserId, validateAndAddReservation, deleteReservationById, modifyReservationById, validateAvailability};
