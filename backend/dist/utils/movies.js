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
exports.getMarvelMovies = void 0;
const general_1 = require("../consts/general");
const Movie_1 = __importDefault(require("../models/Movie"));
const dbService_1 = require("../services/dbService");
const tmdbService_1 = require("../services/tmdbService");
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
