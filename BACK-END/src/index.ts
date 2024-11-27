import express from 'express';
import reservationRouter from './routers/reservation-router';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import  userRouter  from './routers/user-router';
import  ratingRouter  from './routers/rating-router';
import  authRouter  from './routers/auth-router';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(new URL (import.meta.url));
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/*

*/

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);

/*
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
*/
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
