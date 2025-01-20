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
exports.insertMoviesToDb = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Movie_1 = __importDefault(require("../models/Movie"));
const connectToDatabase = (dbUri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUri);
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
const insertMoviesToDb = (movies) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviePromises = movies.map((movie) => __awaiter(void 0, void 0, void 0, function* () {
            yield Movie_1.default.updateOne({ id: movie.id }, {
                $setOnInsert: {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview || "N/A",
                    release_date: movie.release_date || "",
                    popularity: movie.popularity || 0,
                    vote_average: movie.vote_average || 0,
                    vote_count: movie.vote_count || 0,
                    backdrop_path: movie.backdrop_path || "",
                    poster_path: movie.poster_path || "",
                    genre_ids: movie.genre_ids || [],
                },
            }, { upsert: true });
        }));
        yield Promise.all(moviePromises);
        console.log("Movies inserted/updated in the database");
    }
    catch (error) {
        console.error("Error inserting movies into the database:", error);
    }
});
exports.insertMoviesToDb = insertMoviesToDb;
