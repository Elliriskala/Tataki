import express from 'express';
import reservationRouter from './routers/reservation-router';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routers/user-router';
import ratingRouter from './routers/rating-router';
import authRouter from './routers/auth-router';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
// Since you are using ES modules, __dirname is not automatically available. We need to use this workaround:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static('public'));
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front-end/dist/index.html'));
});
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map