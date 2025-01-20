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
exports.getCharactersWithMultipleActors = void 0;
const characters_1 = require("../../utils/characters");
const CharacterWithMultipleActors_1 = __importDefault(require("../../models/CharacterWithMultipleActors"));
const getCharactersWithMultipleActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const existingData = yield CharacterWithMultipleActors_1.default.find()
            .skip(skip)
            .limit(limit);
        if ((existingData === null || existingData === void 0 ? void 0 : existingData.length) > 0) {
            res.json(existingData);
        }
        else {
            const filteredCharacterMap = yield (0, characters_1.getCharactersWithMultipleActorsData)();
            console.log(filteredCharacterMap.length);
            const validCharacterData = filteredCharacterMap.filter((character) => character.characterName);
            if ((validCharacterData === null || validCharacterData === void 0 ? void 0 : validCharacterData.length) > 0) {
                try {
                    yield CharacterWithMultipleActors_1.default.insertMany(validCharacterData);
                    console.log("Inserted valid characters with multiple actors data into DB.");
                }
                catch (dbError) {
                    console.error("Error saving characters with multiple actors data:", dbError);
                }
                if (Array.isArray(filteredCharacterMap)) {
                    res.json(filteredCharacterMap.slice(skip, skip + limit));
                }
                else {
                    console.error("Invalid data format for filteredCharacterMap:", filteredCharacterMap);
                    res.status(500).json({ error: "Invalid data format for characters" });
                }
            }
            else {
                console.warn("Skipping characters with invalid or missing characterName");
                res.status(500).json({ error: "No valid character data to insert" });
            }
        }
    }
    catch (error) {
        console.error("Error fetching characters with multiple actors:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCharactersWithMultipleActors = getCharactersWithMultipleActors;
