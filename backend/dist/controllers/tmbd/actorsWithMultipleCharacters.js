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
exports.getActorsWithMultipleCharacters = void 0;
const actors_1 = require("../../utils/actors");
const ActorsWithMultipleCharacters_1 = __importDefault(require("../../models/ActorsWithMultipleCharacters"));
const getActorsWithMultipleCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;
        const existingData = yield ActorsWithMultipleCharacters_1.default.find()
            .skip(skip)
            .limit(limit);
        if (existingData && existingData.length > 0) {
            res.json(existingData);
        }
        else {
            const actorMap = yield (0, actors_1.getActorMap)();
            const filteredActorMap = (0, actors_1.filterActorsWithMultipleCharacters)(actorMap);
            const newActorsWithMultipleCharactersData = Object.entries(filteredActorMap)
                .slice(skip, skip + limit)
                .map(([actorName, characters]) => {
                const formattedCharacters = characters.map((character) => typeof character === "object" && character.characterName
                    ? character.characterName
                    : JSON.stringify(character));
                return new ActorsWithMultipleCharacters_1.default({
                    actorName,
                    characters: formattedCharacters,
                });
            });
            try {
                yield ActorsWithMultipleCharacters_1.default.insertMany(newActorsWithMultipleCharactersData);
                console.log("Inserted actors with multiple characters data into DB.");
            }
            catch (dbError) {
                console.error("Error saving actors with multiple characters data:", dbError);
            }
            res.json(newActorsWithMultipleCharactersData);
        }
    }
    catch (error) {
        console.error("Error fetching actors with multiple characters:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getActorsWithMultipleCharacters = getActorsWithMultipleCharacters;
