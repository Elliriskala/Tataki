"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisePool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
const promisePool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.promisePool = promisePool;
//# sourceMappingURL=database.js.map