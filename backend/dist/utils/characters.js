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
exports.getCharactersWithMultipleActorsData = void 0;
const tmbdController_1 = require("../controllers/tmbdController");
const CharActors_1 = __importDefault(require("../models/CharActors"));
const tmdbService_1 = require("../services/tmdbService");
const getCharactersWithMultipleActorsData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marvelMovies = yield (0, tmbdController_1.getMarvelMovies)();
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
        for (const [characterName, entries] of Object.entries(filteredCharacterMap)) {
            if (!characterName || characterName.trim() === "") {
                console.warn(`Skipping character with empty or invalid name: ${characterName}`);
                return;
            }
            const existingData = yield CharActors_1.default.findOne({
                characterName,
            });
            if (existingData) {
                console.log(`Character ${characterName} already exists, skipping insert.`);
            }
            else {
                const newCharacterData = new CharActors_1.default({
                    characterName,
                    entries,
                });
                try {
                    yield newCharacterData.save();
                    console.log(`Inserted character: ${characterName}`);
                }
                catch (error) {
                    console.error(`Error saving character ${characterName}:`, error);
                }
            }
        }
        return filteredCharacterMap;
    }
    catch (error) {
        console.error("Error fetching characters with multiple actors:", error);
        throw new Error("Internal Server Error");
    }
});
exports.getCharactersWithMultipleActorsData = getCharactersWithMultipleActorsData;
