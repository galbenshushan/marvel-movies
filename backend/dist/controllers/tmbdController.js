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
exports.getCharactersWithMultipleActors = exports.getMoviesPerActor = exports.getActorsWithMultipleCharacters = exports.getMarvelMovies = void 0;
const tmdbService_1 = require("../services/tmdbService");
const general_1 = require("../consts/general");
const Movie_1 = __importDefault(require("../models/Movie"));
const dbService_1 = require("../services/dbService");
const actors_1 = require("../utils/actors");
const getMarvelMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storedMovies = yield Movie_1.default.find();
        if (storedMovies.length > 0) {
            console.log("Movies fetched from the database");
            return storedMovies;
        }
        console.log("Fetching movies from API");
        const data = yield (0, tmdbService_1.getMovies)(general_1.marvel_company_id);
        yield (0, dbService_1.insertMoviesToDb)(data.results);
        return data.results;
    }
    catch (error) {
        console.error("Error fetching Marvel movies:", error);
        return [];
    }
});
exports.getMarvelMovies = getMarvelMovies;
const getActorsWithMultipleCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actorMap = yield (0, actors_1.getActorMap)();
        const filteredActorMap = (0, actors_1.filterActorsWithMultipleCharacters)(actorMap);
        res.json(filteredActorMap);
    }
    catch (error) {
        console.error("Error fetching characters with multiple actors:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getActorsWithMultipleCharacters = getActorsWithMultipleCharacters;
const getMoviesPerActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesPerActorMap = yield (0, actors_1.getMoviesPerActorMap)();
        res.json(moviesPerActorMap);
    }
    catch (error) {
        console.error("Error fetching movies per actor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getMoviesPerActor = getMoviesPerActor;
const getCharactersWithMultipleActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marvelMovies = yield (0, exports.getMarvelMovies)();
        
        const characterMap = {};
        
        for (const movie of marvelMovies) {
            const actors = yield (0, tmdbService_1.getActorCredits)(movie.id);
            
            actors.forEach((actor) => {
                const { name: actorName, character } = actor;
                
                if (!characterMap[character]) {
                    characterMap[character] = [];
                }
                
                characterMap[character].push({
                    movieName: movie.title,
                    actorName,
                });
            });
        }
        
        const filteredCharacterMap = {};
        Object.entries(characterMap).forEach(([characterName, entries]) => {
            const uniqueActors = new Set(entries.map((entry) => entry.actorName));
            if (uniqueActors.size > 1) {
                filteredCharacterMap[characterName] = entries;
            }
        });
        
        res.json(filteredCharacterMap);
    }
    catch (error) {
        console.error("Error fetching characters with multiple actors:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCharactersWithMultipleActors = getCharactersWithMultipleActors;
