"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbService_1 = require("./services/dbService");
const tmbdRoutes_1 = __importDefault(require("./routes/tmbdRoutes"));
const app = (0, express_1.default)();
const port = 3000;
const dbUri = process.env.DB_URI;
if (!dbUri) {
    throw new Error("DB_URI is not defined in the environment variables");
}
(0, dbService_1.connectToDatabase)(dbUri);
app.use("/marvel", tmbdRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
