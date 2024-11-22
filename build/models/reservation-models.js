var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promisePool } from "../database.ts";
/**
 *
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const fetchReservations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield promisePool.query("SELECT * FROM reservations");
        if (rows) {
            return rows;
        }
    }
    catch (e) {
        console.error('fetchReservations error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param reservation_id
 * @returns reservation with the given reservation_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationById = (reservation_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = 'SELECT * FROM reservations WHERE reservation_id = ?';
        const [rows] = yield promisePool.query(sql, [reservation_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchReservationById, Reservation not found');
        }
    }
    catch (e) {
        console.error('fetchReservationById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param user_id
 * @returns reservations with the given user_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = 'SELECT * FROM reservations WHERE user_id = ?';
        const [rows] = yield promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchReservationById, Reservation not found');
        }
    }
    catch (e) {
        console.error('fetchReservationById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param newReservation
 * @returns reservation_id of the newly created reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the newly created reservation
 */
const createReservation = (newReservation) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO reservations (user_id, reservation_date, reservation_time, guests) VALUES (?, ?, ?, ?)';
    const params = [
        newReservation.user_id,
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests
    ];
    try {
        const [result] = yield promisePool.query(sql, params);
        if (result.affectedRows === 1) {
            return result.insertId;
        }
        else {
            throw new Error('CreateReservation, Reservation not created');
        }
    }
    catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            throw new Error('Reservation already exists');
        }
        else {
            console.error('createReservation error:', e.message);
            throw new Error('Database error: ' + e.message);
        }
    }
});
const modifyReservation = (reservation_id, newReservation) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'UPDATE reservations SET reservation_date = ?, reservation_time = ?, guests = ? WHERE reservation_id = ?';
    const params = [
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests,
        reservation_id
    ];
    try {
        const [result] = yield promisePool.query(sql, params);
        if (result.affectedRows > 0) {
            return result.affectedRows;
        }
        else {
            throw new Error('ModifyReservation, Reservation not modified');
        }
    }
    catch (e) {
        console.error('modifyReservation error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param reservation_id
 * @returns reservation_id of the deleted reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the deleted reservation
 */
const deleteReservation = (reservation_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM reservations WHERE reservation_id = ?';
    try {
        const [result] = yield promisePool.query(sql, [reservation_id]);
        if (result.affectedRows === 1) {
            return reservation_id;
        }
        else {
            throw new Error('DeleteReservation, Reservation not deleted');
        }
    }
    catch (e) {
        console.error('deleteReservation error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
export { fetchReservations, fetchReservationById, fetchReservationsByUserId, createReservation, deleteReservation, modifyReservation };
//# sourceMappingURL=reservation-models.js.map