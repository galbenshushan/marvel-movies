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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesPerActorMap = exports.filterActorsWithMultipleCharacters = exports.getActorMap = void 0;
const tmbdController_1 = require("../controllers/tmbdController");
const tmdbService_1 = require("../services/tmdbService");
const getActorMap = () => __awaiter(void 0, void 0, void 0, function* () {
    const marvelMovies = yield (0, tmbdController_1.getMarvelMovies)();
    const actorMap = {};
    for (const movie of marvelMovies) {
        const actors = yield (0, tmdbService_1.getActorCredits)(movie.id);
        actors.forEach((actor) => {
            const { name: actorName, character } = actor;
            if (!actorMap[actorName]) {
                actorMap[actorName] = [];
            }
            actorMap[actorName].push({
                movieName: movie.title,
                characterName: character,
            });
        });
    }
    return actorMap;
});
exports.getActorMap = getActorMap;
const filterActorsWithMultipleCharacters = (actorMap) => {
    const filteredActorMap = {};
    Object.entries(actorMap).forEach(([actorName, entries]) => {
        const uniqueEntries = Array.from(new Map(entries.map((entry) => [entry.characterName, entry])).values());
        if (uniqueEntries.length > 1) {
            filteredActorMap[actorName] = uniqueEntries;
        }
    });
    return filteredActorMap;
};
exports.filterActorsWithMultipleCharacters = filterActorsWithMultipleCharacters;
const getMoviesPerActorMap = () => __awaiter(void 0, void 0, void 0, function* () {
    const marvelMovies = yield (0, tmbdController_1.getMarvelMovies)();
    const moviesPerActorMap = {};
    for (const movie of marvelMovies) {
        const actors = yield (0, tmdbService_1.getActorCredits)(movie.id);
        actors.forEach((actor) => {
            let actorName = actor.name;
            actorName = actorName.replace(/\./g, "_");
            if (!moviesPerActorMap[actorName]) {
                moviesPerActorMap[actorName] = [];
            }
            if (!moviesPerActorMap[actorName].includes(movie.title)) {
                moviesPerActorMap[actorName].push(movie.title);
            }
        });
    }
    return moviesPerActorMap;
});
exports.getMoviesPerActorMap = getMoviesPerActorMap;
