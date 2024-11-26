"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authenticateToken = (req, res, next) => {
    console.log('AuthenticateToken', req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
exports.default = authenticateToken;
//# sourceMappingURL=authentication.js.map