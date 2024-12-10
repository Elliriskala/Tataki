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

    next();
  } catch {
    throw new next(customError('Invalid token', 401));
  }
};

// check if the user is admin to access the admin routes
const isAdmin = (req, res, next) => {
  if (req.user?.user_level_id === 1) {
    return next();
  }
  console.error('Access denied: not an admin');
  res.status(403).send('Forbidden');
};

export {authenticateToken, isAdmin};
