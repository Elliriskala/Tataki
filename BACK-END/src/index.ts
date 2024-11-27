import express from 'express';
import reservationRouter from './routers/reservation-router';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import  userRouter  from './routers/user-router';
import  ratingRouter  from './routers/rating-router';
import  authRouter  from './routers/auth-router';
import  menuRouter from './routers/menu-router'; 


const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory (this should include your styles, JS, images)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes (Make sure these are defined before the dynamic HTML route)
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/menus', menuRouter);

// Serve the main index.html for the root route (no conflicts with the API)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Dynamic route to serve other HTML files based on route name (for other pages)
app.get('/:page', (req, res) => {
  const { page } = req.params;
  const filePath = path.join(__dirname, '../public', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`File not found: ${filePath}`);
      res.status(404).send('Page not found');
    }
  });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});