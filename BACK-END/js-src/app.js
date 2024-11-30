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

const frontEndPath = '../../FRONT-END/dist';

app.use('/api/users', userRouter);
app.use('/api/reviews', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/menus', menuRouter);
app.use('/api/orders', orderRouter);

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the "public" directory (this should include your styles, JS, images)
app.use(express.static(path.join(__dirname, frontEndPath)));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'index.html'));
});

app.get('/about', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'about.html'));
});

app.get('/admin', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'admin.html'));
});

app.get('/contact', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'contact.html'));
});

app.get('/menu', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'menu.html'));
});

app.get('/order', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'order.html'));
});

app.get('/order_management', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'order_management.html'));
});

app.get('/reservation', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'reservation.html'));
});

app.get('/user', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'user.html'));
});

app.get('review' , (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'review.html'));
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, frontEndPath, 'index.html'));
});

// API Routes (Make sure these are defined before the dynamic HTML route)


// Serve the main index.html for the root route (no conflicts with the API)



app.use(notFoundHandler);
app.use(errorHandler);


// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
