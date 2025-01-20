"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tmbd_1 = require("../controllers/tmbd");
const movies_1 = require("../controllers/tmbd/movies");
const router = express_1.default.Router();
router.get("/actorsWithMultipleCharacters", tmbd_1.getActorsWithMultipleCharacters);
router.get("/charactersWithMultipleActors", tmbd_1.getCharactersWithMultipleActors);
router.get("/moviesPerActor", tmbd_1.getMoviesPerActor);
router.get("/movies", movies_1.getMovies);
exports.default = router;
