import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {customError} from './error-handlers.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User from token:", req.user);

    next();
  } catch {
    throw new next(customError('Invalid token', 401));
  }
};

// check if the user is admin to access the admin routes
const isAdmin = (req, res, next) => {
  console.log('Checking admin rights...');
  if (req.user?.user_level_id === 1) {
    console.log('Admin verified');
    return next();
  }
  console.error('Access denied: not an admin');
  res.status(403).send('Forbidden');
};

export {authenticateToken, isAdmin};
