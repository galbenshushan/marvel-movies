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
exports.getMoviesPerActor = void 0;
const actors_1 = require("../../utils/actors");
const MoviesPerActor_1 = __importDefault(require("../../models/MoviesPerActor"));
const getMoviesPerActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;
        const moviesPerActorData = yield MoviesPerActor_1.default.find()
            .skip(skip)
            .limit(limit);
        if (moviesPerActorData && moviesPerActorData.length > 0) {
            res.json(moviesPerActorData);
        }
        else {
            const newMoviesPerActorData = yield (0, actors_1.getMoviesPerActorMap)();
            const selectedMoviesPerActorData = Object.entries(newMoviesPerActorData)
                .slice(skip, skip + limit)
                .map(([actorName, movies]) => {
                return new MoviesPerActor_1.default({
                    actorName,
                    movies,
                });
            });
            try {
                yield MoviesPerActor_1.default.insertMany(selectedMoviesPerActorData);
                console.log("Inserted new movies per actor data into DB.");
            }
            catch (dbError) {
                console.error("Error saving movies per actor data:", dbError);
            }
            res.json(selectedMoviesPerActorData);
        }
    }
    catch (error) {
        console.error("Error fetching movies per actor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getMoviesPerActor = getMoviesPerActor;
