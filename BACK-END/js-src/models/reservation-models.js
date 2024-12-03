import {promisePool} from '../database.js';


/**
 *
 * @returns all reservations from the database
 * @throws Error
 * @returns {Promise<Reservation[]>} - Array of reservations
 */
const fetchReservations = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Reservations');
    if (rows) {
      return rows;
    }
  } catch (e) {
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
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (e) {
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
      console.log(rows[0]);
      return rows;
    } else {
      return null;
    }
  } catch (e) {
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

const addReservation = async (newReservation) => {
  try {
    // Step 1: Check if the user already has 5 reservations
    const countSQL =
      'SELECT COUNT(*) AS reservationCount FROM Reservations WHERE user_id = ?';
    const [countResult] = await promisePool.query(countSQL, [newReservation.user_id]);

    if (countResult[0].reservationCount >= 5) {
      return { success: false, message: 'Maximum reservation limit (5) reached for this user.' };
    }

    // Step 2: Find the timeslot_id based on the selected reservation_time
    const timeSlotSQL =
      'SELECT timeslot_id FROM TimeSlots WHERE reservation_time = ?';
    const [timeslot] = await promisePool.query(timeSlotSQL, [
      newReservation.reservation_time,
    ]);

    if (!timeslot || timeslot.length === 0) {
      return { success: false, message: 'Timeslot not found' };
    }

    const timeslot_id = timeslot[0].timeslot_id;

    // Step 3: Insert the reservation into the Reservations table
    const addSQL =
      'INSERT INTO Reservations (user_id, reservation_date, reservation_time, email, full_name, phone_number, timeslot_id, guests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const params = [
      newReservation.user_id,
      newReservation.reservation_date,
      newReservation.reservation_time,
      newReservation.email,
      newReservation.full_name,
      newReservation.phone_number,
      timeslot_id,
      newReservation.guests,
    ];

    const result = await promisePool.query(addSQL, params);

    if (result[0].affectedRows === 1) {
      return { success: true, insertId: result[0].insertId };
    } else {
      return { success: false, message: 'Reservation not added' };
    }
  } catch (error) {
    console.error('Error adding reservation:', error);
    return { success: false, message: 'Database error: ' + error.message };
  }
};


const modifyReservation = async (reservation_id, newReservation) => {
  const sql =
    'UPDATE Reservations SET reservation_date = ?, reservation_time = ?, guests = ? WHERE reservation_id = ?';
  const params = [
    newReservation.reservation_date,
    newReservation.reservation_time,
    newReservation.guests,
    reservation_id,
  ];
  try {
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows > 0) {
      return result.affectedRows;
    } else {
      throw new Error('ModifyReservation, Reservation not modified');
    }
  } catch (e) {
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
    } else {
      return null;
    }
  } catch (e) {
    console.error('deleteReservation error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

const checkAvailability = async (date, guests) => {
  // SQL query to find available timeslots
  const sql = `
    SELECT t.reservation_time, t.max_guests
    FROM TimeSlots t
    LEFT JOIN Reservations r
        ON t.reservation_time = r.reservation_time
        AND r.reservation_date = ?
    WHERE t.max_guests >= ?
    GROUP BY t.timeslot_id, t.reservation_time, t.max_guests
    HAVING COUNT(r.reservation_id) < t.max_guests`;
  try {
    const [rows] = await promisePool.query(sql, [date, guests]);
    return rows; // Return the available timeslots (array of objects)
  } catch (e) {
    console.error('checkAvailability error:', e.message);
    throw new Error('Database query failed');
  }
};

export {
  fetchReservations,
  fetchReservationById,
  fetchReservationsByUserId,
  addReservation,
  deleteReservation,
  modifyReservation,
  checkAvailability,
};
