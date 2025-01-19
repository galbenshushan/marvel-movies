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
exports.getActorCredits = exports.getMovies = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const general_1 = require("../consts/general");
dotenv_1.default.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
const getMovies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1;
    try {
        while (currentPage <= totalPages) {
            const response = yield fetch(`${BASE_URL}/discover/movie?with_companies=${id}&page=${currentPage}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error fetching data from TMDB");
            }
            const data = yield response.json();
            allMovies = allMovies.concat(data.results);
            totalPages = data.total_pages;
            currentPage++;
        }
        return {
            results: allMovies,
            total_pages: totalPages,
            total_results: allMovies.length,
        };
    }
    catch (error) {
        console.error("Error fetching Marvel movies:", error);
        return general_1.emptyMovieResult;
    }
});
exports.getMovies = getMovies;
const getActorCredits = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${process.env.BASE_URL}/movie/${movieId}/credits`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const creditsData = yield response.json();
        const actors = creditsData.cast.filter((actor) => actor.known_for_department === "Acting");
        return actors;
    }
    catch (error) {
        console.error("Error fetching credits:", error);
        return [];
    }
});
exports.getActorCredits = getActorCredits;
