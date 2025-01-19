import express from "express";
import { connectToDatabase } from "./services/dbService";
import tmbdRoutes from "./routes/tmbdRoutes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

connectToDatabase(dbUri);

app.use("/marvel", tmbdRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
