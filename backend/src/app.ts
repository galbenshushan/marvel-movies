import express from "express";
import { connectToDatabase } from "./services/dbService";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMoviesPerActor,
} from "./controllers/tmbdController";

const app = express();
const port = 3000;

const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

const start = async () => {
  connectToDatabase(dbUri);
};

start();

app.get("/actorsWithMultipleCharacters", getActorsWithMultipleCharacters);
app.get("/charactersWithMultipleActors", getCharactersWithMultipleActors);
app.get("/moviesPerActor", getMoviesPerActor);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
