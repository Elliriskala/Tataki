import { fetchReservations, fetchReservationById, fetchReservationsByUserId, addReservation, deleteReservation, modifyReservation, checkAvailability } from '../models/reservation-models.js';
import { customError } from '../middlewares/error-handlers.js';
import { decodeToken } from './auth-controller.js';
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
        if (reservation) {
        res.json(reservation);
        } else {
        res.status(404).json({ message: 'Reservation not found' });
        }
    }catch (e) {
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
    const token = req.headers.authorization.split(' ')[1];
    let user_id;
    if (!token) {
        return next(customError('Missing token', 400));
    } else {
        const decoded = decodeToken(token);
        if (!decoded) {
            return next(customError('Invalid token', 401));
        }
        user_id = decoded.user_id;
    }
    if (!user_id) {
        return next(customError('Missing user_id', 400));
    }
    try {
        const reservations = await fetchReservationsByUserId(user_id);
        if (reservations) {
            res.json(reservations);
        }
        else {
            res.status(404).json({ message: 'No reservations found' });
        }
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
    // decode user id if token is provide
    let { user_id, reservation_date, email, reservation_time, full_name, phone_number, guests } = req.body;
    let decoded = null;

// Decode user_id if a token is provided
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Assuming "Bearer <token>" format
            decoded = decodeToken(token); // Replace decodeToken with your JWT decoding function
            if (decoded && decoded.user_id) {
                user_id = decoded.user_id;
            }
        } catch (error) {
            console.error('Error decoding token:', error.message);
            return next(customError('Invalid token', 401));
        }
    }

    // Validate required fields
    if (!reservation_date || !reservation_time || !guests || !full_name || !phone_number || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate data types
    if (typeof guests !== 'number' || guests <= 0) {
        return res.status(400).json({ error: 'Guests must be a positive number' });
    }

    try {
        // Check availability for the given date and time
        const available = await checkAvailability(reservation_date, guests);

        if (available && available.length > 0) {
            // If availability exists, proceed to add the reservation
            const newReservation = { user_id, reservation_date, reservation_time, full_name, phone_number, email, guests };
            const result = await addReservation(newReservation);

            if (result.success) {
                res.status(201).json({ message: 'Reservation successfully added' });
            } else {
                console.error('Error adding reservation:', result.message);
                res.status(500).json({ error: 'Failed to add reservation', details: result.message });
            }
        } else {
            res.status(404).json({ error: 'No availability for the selected time and date' });
        }
    } catch (error) {
        console.error('Error processing reservation:', error.message);
        next(customError('Error processing reservation', 500));
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
        return new next(customError('Missing date or number of guests', 400));
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
