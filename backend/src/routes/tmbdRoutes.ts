import express from "express";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMoviesPerActor,
} from "../controllers/tmbd";

const router = express.Router();

router.get("/actorsWithMultipleCharacters", getActorsWithMultipleCharacters);
router.get("/charactersWithMultipleActors", getCharactersWithMultipleActors);
router.get("/moviesPerActor", getMoviesPerActor);

export default router;
