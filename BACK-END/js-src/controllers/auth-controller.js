import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fetchUserById, selectUserByEmail } from '../models/user-models.js';
import 'dotenv/config';
import {customError} from '../middlewares/error-handlers.js';


const postLogin = async (req, res, next) => {
    console.log('postLogin', req.body);
    const {email, password} = req.body;
    const user = await selectUserByEmail(email);
    if (!user) {
      return next(customError(`Username not found.`, 401));
    }
    const pwMatch = await bcrypt.compare(password, user.password_hash);
    if (pwMatch) {
      const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      // DO not include password hash into response
      delete user.password_hash;
      return res.json({...user, token});
    } else {
      return next(customError(`Password invalid.`, 401));
    }
  };


const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.error('decodeToken', e.message);
    return null;
  }
};


const getMe = async (req, res) => {
    const id = req.body.user_id;
    try {
        const user = await fetchUserById(req.body.user_id);
        if (user) {
            res.json({ user_id: id, ...user });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (e) {
        console.error('getMe', +e.message);
        res.status(503).json({ message: 'Error in getMe' });
    }
    ;
};
export { postLogin, getMe, decodeToken};
