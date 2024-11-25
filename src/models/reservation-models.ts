import { promisePool } from "../database.ts";
import { Reservation } from "../utils/interfaces.ts";

/**
 * 
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const fetchReservations = async () => {
    try {
        const rows = await promisePool.query("SELECT * FROM reservations");
        if (rows) {
            return rows;
        }
    } catch (e) {
        console.error('fetchReservations error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
};

/**
 *  
 * @param reservation_id
 * @returns reservation with the given reservation_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationById = async (reservation_id: number): Promise<Reservation | null> => {
    try {
        const sql = 'SELECT * FROM reservations WHERE reservation_id = ?';
        const [rows]: any = await promisePool.query(sql, [reservation_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('FetchReservationById, Reservation not found');
        }
    } catch (e) {
        console.error('fetchReservationById error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
}

/**
 * 
 * @param user_id
 * @returns reservations with the given user_id
 * @throws Error
 * @returns {Promise<Reservation | null>} - Reservation object or null if not found
 */
const fetchReservationsByUserId = async (user_id: number): Promise<Reservation | null> => {
    try {
        const sql = 'SELECT * FROM reservations WHERE user_id = ?';
        const [rows]: any = await promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('FetchReservationById, Reservation not found');
        }
    } catch (e) {
        console.error('fetchReservationById error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
};

/**
 * 
 * @param newReservation 
 * @returns reservation_id of the newly created reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the newly created reservation
 */
const createReservation = async (newReservation: Reservation): Promise<number> => {
    const sql = 'INSERT INTO reservations (user_id, reservation_date, reservation_time, guests) VALUES (?, ?, ?, ?)';
    const params = [
        newReservation.user_id,
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests
    ];
    try {
        const [result]: any = await promisePool.query(sql, params);
        if (result.affectedRows === 1) {
            return result.insertId;
        } else {
            throw new Error('CreateReservation, Reservation not created');
        }
    } catch (e) {
        if ((e as any).code === 'ER_DUP_ENTRY') {
            throw new Error('Reservation already exists');
        } else {
            console.error('createReservation error:', (e as Error).message);
            throw new Error('Database error: ' + (e as Error).message);
        }
    }
};


const modifyReservation = async (reservation_id: number, newReservation: Reservation): Promise<number> => {
    const sql = 'UPDATE reservations SET reservation_date = ?, reservation_time = ?, guests = ? WHERE reservation_id = ?';
    const params = [
        newReservation.reservation_date,
        newReservation.reservation_time,
        newReservation.guests,
        reservation_id
    ];
    try {
        const [result]: any = await promisePool.query(sql, params);
        if (result.affectedRows > 0) {
            return result.affectedRows;
        } else {
            throw new Error('ModifyReservation, Reservation not modified');
        }
    } catch (e) {
        console.error('modifyReservation error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
}


/**
 * 
 * @param reservation_id
 * @returns reservation_id of the deleted reservation
 * @throws Error
 * @returns {Promise<number>} - reservation_id of the deleted reservation
 */
const deleteReservation = async (reservation_id: number): Promise<number> => {
    const sql = 'DELETE FROM reservations WHERE reservation_id = ?';
    try {
        const [result]: any = await promisePool.query(sql, [reservation_id]);
        if (result.affectedRows === 1) {
            return reservation_id;
        } else {
            throw new Error('DeleteReservation, Reservation not deleted');
        }
    } catch (e) {
        console.error('deleteReservation error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
}

export { fetchReservations, fetchReservationById, fetchReservationsByUserId, createReservation, deleteReservation, modifyReservation };