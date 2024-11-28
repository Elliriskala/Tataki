import jwt from 'jsonwebtoken';
import { fetchUserById, selectUsernameAndPassword } from '../models/user-models.js';
import 'dotenv/config';
const postLogin = async (req, res) => {
    console.log('postLogin', req.body);
    const { username, password } = req.body;
    const user = await selectUsernameAndPassword(username, password);
    if (user) {
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
        if (!jwtSecret || !jwtExpiresIn) {
            res.status(500).json({ message: 'JWT_SECRET or JWT_EXPIRES_IN is not defined' });
            return;
        }
        const token = jwt.sign({ user_id: user.user_id, user_level_id: user.user_level_id }, jwtSecret, { expiresIn: jwtExpiresIn });
        res.json({ token });
    }
    else {
        res.sendStatus(401);
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
export { postLogin, getMe };
