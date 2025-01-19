import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectToDatabase from "./services/dbService";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

connectToDatabase(dbUri);

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
// app.use("/api", orderRoutes);



server.listen(PORT, async () => {
  console.log(`Listening on port ${PORT} `);
});
