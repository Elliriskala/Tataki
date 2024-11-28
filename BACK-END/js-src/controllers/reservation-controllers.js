import { fetchReservations, fetchReservationById, fetchReservationsByUserId, createReservation, deleteReservation, modifyReservation } from '../models/reservation-models.js';
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
const getReservationsByUserId = async (req, res) => {
    const user_id = Number(req.params.user_id);
    try {
        const reservations = await fetchReservationsByUserId(user_id);
        res.json(reservations);
    }
    catch (e) {
        console.error('getReservationsByUserId error:', e.message);
        throw new Error('getReservationsByUserId error: ' + e.message);
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
const postReservation = async (req, res) => {
    const newReservation = {
        user_id: req.body.user_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        guests: req.body.guests
    };
    try {
        const reservation_id = await createReservation(newReservation);
        if (reservation_id) {
            res.status(201).json({ message: 'Reservation added: ', id: { reservation_id } });
        }
        else {
            res.status(500).json({ message: 'Reservation not added' });
        }
    }
    catch (e) {
        console.error('postReservation error:', e.message);
        throw new Error('postReservation error: ' + e.message);
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
const deleteReservationById = async (req, res) => {
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
        throw new Error('deleteReservationById error: ' + e.message);
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
const modifyReservationById = async (req, res) => {
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
        throw new Error('modifyReservationById error: ' + e.message);
    }
};
export { getReservations, getReservationById, getReservationsByUserId, postReservation, deleteReservationById, modifyReservationById };
