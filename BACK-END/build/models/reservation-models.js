import { promisePool } from "../database.js";
/**
 *
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const fetchReservations = async () => {
    try {
        const [rows] = await promisePool.query("SELECT * FROM Reservations");
        if (rows) {
            return rows;
        }
    }
    catch (e) {
        console.error('fetchReservations error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param reservation_id
 * @returns reservation with the given reservation_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationById = async (reservation_id) => {
    try {
        const sql = 'SELECT * FROM Reservations WHERE reservation_id = ?';
        const [rows] = await promisePool.query(sql, [reservation_id]);
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
};
/**
 *
 * @param user_id
 * @returns reservations with the given user_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationsByUserId = async (user_id) => {
    try {
        const sql = 'SELECT * FROM Reservations WHERE user_id = ?';
        const [rows] = await promisePool.query(sql, [user_id]);
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
};
/**
 *
 * @param newReservation
 * @returns reservation_id of the newly created reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the newly created reservation
 */
const createReservation = async (newReservation) => {
    const sql = 'INSERT INTO Reservations (user_id, reservation_date, reservation_time, guests) VALUES (?, ?, ?, ?)';
    const params = [
        newReservation.user_id,
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests
    ];
    try {
        const [result] = await promisePool.query(sql, params);
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
};
const modifyReservation = async (reservation_id, newReservation) => {
    const sql = 'UPDATE Reservations SET reservation_date = ?, reservation_time = ?, guests = ? WHERE reservation_id = ?';
    const params = [
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests,
        reservation_id
    ];
    try {
        const [result] = await promisePool.query(sql, params);
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
};
/**
 *
 * @param reservation_id
 * @returns reservation_id of the deleted reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the deleted reservation
 */
const deleteReservation = async (reservation_id) => {
    const sql = 'DELETE FROM Reservations WHERE reservation_id = ?';
    try {
        const [result] = await promisePool.query(sql, [reservation_id]);
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
};
export { fetchReservations, fetchReservationById, fetchReservationsByUserId, createReservation, deleteReservation, modifyReservation };
//# sourceMappingURL=reservation-models.js.map