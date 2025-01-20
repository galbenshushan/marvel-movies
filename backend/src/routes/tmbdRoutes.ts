import express from "express";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMoviesPerActor,
} from "../controllers/tmbd";
import { getMovies } from "../controllers/tmbd/movies";

const router = express.Router();

router.get("/actorsWithMultipleCharacters", getActorsWithMultipleCharacters);
router.get("/charactersWithMultipleActors", getCharactersWithMultipleActors);
router.get("/moviesPerActor", getMoviesPerActor);
router.get("/movies", getMovies);

export default router;
