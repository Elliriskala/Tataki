"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_router_1 = __importDefault(require("./routers/reservation-router"));
const hostname = '127.0.0.1';
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
/*
app.use('/api/users', userRouter);

app.use('/api/ratings', ratingRouter);
app.use('/api/auth', authRouter);
*/
app.use('/api/reservations', reservation_router_1.default);
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map