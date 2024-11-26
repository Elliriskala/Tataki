import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../utils/interfaces.ts';

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    console.log('AuthenticateToken', req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (e) {
        res.status(403).send({ message: 'Invalid token' });
        if (e instanceof Error) {
            console.error('authenticateToken error:', e.message);
        } else {
            console.error('authenticateToken error:', e);
        }
    }
}

export default authenticateToken;