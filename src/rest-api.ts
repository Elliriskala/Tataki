import express from 'express';
import reservationRouter from './routers/reservation-router.ts';
import ratingRouter from './routers/rating-router.ts';
import userRouter from './routers/user-router.ts';
import authRouter from './routers/auth-router.ts';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static('public'));


app.use('/api/users', userRouter);

app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);

app.use('/api/reservations', reservationRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});