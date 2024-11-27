import express from 'express';
import reservationRouter from './routers/reservation-router.js';
import path from 'path';
import cors from 'cors';
import userRouter from './routers/user-router.js';
import ratingRouter from './routers/rating-router.js';
import authRouter from './routers/auth-router.js';
import menuRouter from './routers/menu-router.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/*
const __filename = fileURLToPath(new URL (import.meta.url));
const __dirname = path.dirname(__filename);
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/menus', menuRouter);
/*
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
*/
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map