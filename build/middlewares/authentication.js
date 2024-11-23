import jwt from 'jsonwebtoken';
import 'dotenv/config';
const authenticateToken = (req, res, next) => {
    console.log('AuthenticateToken', req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        res.status(403).send({ message: 'Invalid token' });
        if (e instanceof Error) {
            console.error('authenticateToken error:', e.message);
        }
        else {
            console.error('authenticateToken error:', e);
        }
    }
};
export default authenticateToken;
//# sourceMappingURL=authentication.js.map