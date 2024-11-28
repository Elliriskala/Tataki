import express from 'express';
import reservationRouter from './routers/reservation-router.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import userRouter from './routers/user-router.js';
import ratingRouter from './routers/rating-router.js';
import authRouter from './routers/auth-router.js';
import menuRouter from './routers/menu-router.js';
import orderRouter from './routers/order-router.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handlers.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the "public" directory (this should include your styles, JS, images)
app.use(express.static(path.join(__dirname, '../../FRONT-END/dist')));

// API Routes (Make sure these are defined before the dynamic HTML route)
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/menus', menuRouter);
app.use('/api/orders', orderRouter);

// Serve the main index.html for the root route (no conflicts with the API)
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../FRONT-END/DIST', 'index.html'));
});


app.use(notFoundHandler);
app.use(errorHandler);


// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
