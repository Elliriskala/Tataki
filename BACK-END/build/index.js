import express from 'express';
import reservationRouter from './routers/reservation-router.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import userRouter from './routers/user-router.js';
import ratingRouter from './routers/rating-router.js';
import authRouter from './routers/auth-router.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map