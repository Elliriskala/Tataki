import jwt from 'jsonwebtoken';
import { fetchUserById, selectUsernameAndPassword } from '../models/user-models';
import 'dotenv/config';

import { Request, Response } from 'express';

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

const postLogin = async (req: LoginRequest, res: Response) => {
    console.log('postLogin', req.body);
    const {username, password} = req.body;
    const user = await selectUsernameAndPassword(username, password);
    if (user) {
      const token = jwt.sign({user_id: user.user_id, user_level_id: user.user_level_id}, import.meta.env.JWT_SECRET, {expiresIn: import.meta.env.JWT_EXPIRES_IN});
      res.json({token});
    } else {
      res.sendStatus(401);
    }
  };

  const getMe = async (req: Request, res: Response) => {
    const id = req.body.user_id;
    try {
    const user = await fetchUserById(req.body.user_id);
    if (user) {
      res.json({user_id: id, ...user});
    } else {
      res.sendStatus(401);
    } 
  } catch (e) {
    console.error('getMe', + (e as Error).message);
    res.status(503).json({message: 'Error in getMe'});
  };
  }

export { postLogin, getMe };