"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharactersWithMultipleActors = exports.getMoviesPerActor = exports.getActorsWithMultipleCharacters = void 0;
const actorsWithMultipleCharacters_1 = require("./actorsWithMultipleCharacters");
Object.defineProperty(exports, "getActorsWithMultipleCharacters", { enumerable: true, get: function () { return actorsWithMultipleCharacters_1.getActorsWithMultipleCharacters; } });
const moviesPerActor_1 = require("./moviesPerActor");
Object.defineProperty(exports, "getMoviesPerActor", { enumerable: true, get: function () { return moviesPerActor_1.getMoviesPerActor; } });
const charactersWithMultipleActors_1 = require("./charactersWithMultipleActors");
Object.defineProperty(exports, "getCharactersWithMultipleActors", { enumerable: true, get: function () { return charactersWithMultipleActors_1.getCharactersWithMultipleActors; } });
