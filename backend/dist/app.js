"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import orderRoutes from "./routes/orderRoute";
const http_1 = __importDefault(require("http"));
// import socketIo from "socket.io";
const dbService_1 = __importDefault(require("./services/dbService"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;
if (!dbUri) {
    throw new Error("DB_URI is not defined in the environment variables");
}
(0, dbService_1.default)(dbUri);
// export const io = new socketIo.Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST"],
//   },
// });
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
// app.use("/api", orderRoutes);
// io.on("connection", socketHandler);
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Listening on port ${PORT} `);
}));
