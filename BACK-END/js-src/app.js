import express from 'express';
import reservationRouter from './routers/reservation-router.js';
import path from 'path';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit';
import {fileURLToPath} from 'url';
import userRouter from './routers/user-router.js';
import ratingRouter from './routers/rating-router.js';
import authRouter from './routers/auth-router.js';
import menuRouter from './routers/menu-router.js';
import orderRouter from './routers/order-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
import itineraryRouter from './routers/itineray-router.js';

const hostname = '0.0.0.0';
const port = process.env.PORT || 443;
const app = express();


// Rate limit requests to the API
const limiter2 = rateLimit({
  windowMs: 120 * 60 * 1000,  // 2 hours
  max: 2, 
  message: 'Too many requests from this IP, please try again after two hours',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  cors({
    origin: '*', // Allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the front-end static files
const frontEndPath = '../../FRONT-END/dist';

<<<<<<< HEAD

=======
>>>>>>> bad6f482ae4161d088019419e193feba95ed244d
// Serve static files from the "public" directory

app.use('/api/users', userRouter);
app.use('/api/reviews', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/menus', menuRouter);
app.use('/api/orders', orderRouter);
app.use('/api/digitransit', itineraryRouter);

app.use(express.static(frontEndPath));

<<<<<<< HEAD

=======
>>>>>>> bad6f482ae4161d088019419e193feba95ed244d
// Define routes for known pages
app.get('/about', (_req, res) => {
  res.sendFile(path.join(__dirname, frontEndPath, 'about.html'));
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

app.get('/reservation', (_req, res) => {
  res.sendFile(path.join(__dirname, frontEndPath, 'reservation.html'));
});

app.get('/user', (_req, res) => {
  res.sendFile(path.join(__dirname, frontEndPath, 'user.html'));
});

app.get('/review', (_req, res) => {
  res.sendFile(path.join(__dirname, frontEndPath, 'review.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export {limiter2};