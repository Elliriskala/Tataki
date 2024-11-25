import mysql, {Pool} from 'mysql2';
import 'dotenv/config';

const promisePool: Pool = mysql.createPool({
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASS,
    database: import.meta.env.VITE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export {promisePool};