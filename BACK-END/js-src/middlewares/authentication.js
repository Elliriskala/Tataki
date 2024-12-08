import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {customError} from './error-handlers.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
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
  console.log('Checking admin access for user:', req.user); // Debug log

  if (req.user && req.user.user_level_id === 1) {
    console.log('User is an admin');
    next();
  } else {
    console.warn('Access denied: User is not an admin');
    return res.sendStatus(403);
  }
};

export {authenticateToken, isAdmin};
