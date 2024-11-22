var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchReservations, fetchReservationById, fetchReservationsByUserId, createReservation, deleteReservation, modifyReservation } from '../models/reservation-models.ts';
/**
 *
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const getReservations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield fetchReservations();
        res.json(reservations);
    }
    catch (e) {
        console.error('getReservations error:', e.message);
        throw new Error('getReservations error: ' + e.message);
    }
});
/**
 *
 * @param req
 * @param res
 * @returns reservation with the given reservation_id
 * @throws Error
 * @returns {Promise<void>} - Reservation object or null if not found
 */
const getReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation_id = Number(req.params.reservation_id);
    try {
        const reservation = yield fetchReservationById(reservation_id);
        res.json(reservation);
    }
    catch (e) {
        console.error('getReservationById error:', e.message);
        throw new Error('getReservationById error: ' + e.message);
    }
});
/**
 *
 * @param req
 * @param res
 * @returns reservations with the given user_id
 * @throws Error
 * @returns {Promise<void>} - Reservation object or null if not found
 */
const getReservationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.user_id);
    try {
        const reservations = yield fetchReservationsByUserId(user_id);
        res.json(reservations);
    }
    catch (e) {
        console.error('getReservationsByUserId error:', e.message);
        throw new Error('getReservationsByUserId error: ' + e.message);
    }
});
/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the newly created reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the newly created reservation
 */
const postReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newReservation = {
        user_id: req.body.user_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        guests: req.body.guests,
        special_request: req.body.special_request
    };
    try {
        const reservation_id = yield createReservation(newReservation);
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
});
/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the deleted reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the deleted reservation
 */
const deleteReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation_id = Number(req.params.reservation_id);
    try {
        const result = yield deleteReservation(reservation_id);
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
});
/**
 *
 * @param req
 * @param res
 * @returns reservation_id of the modified reservation
 * @throws Error
 * @returns {Promise<void>} - reservation_id of the modified reservation
 */
const modifyReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation_id = Number(req.params.reservation_id);
    const newReservation = {
        user_id: req.body.user_id,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        guests: req.body.guests
    };
    try {
        const result = yield modifyReservation(reservation_id, newReservation);
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
});
export { getReservations, getReservationById, getReservationsByUserId, postReservation, deleteReservationById, modifyReservationById };
//# sourceMappingURL=reservation-controllers.js.map