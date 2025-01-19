import { getMovies } from "../services/tmdbService";
import { marvel_company_id } from "../consts/general";
import { MovieType } from "../types/general";
import Movie from "../models/Movie";
import { insertMoviesToDb } from "../services/dbService";
import { Request, Response } from "express";
import {
  filterActorsWithMultipleCharacters,
  getActorMap,
  getMoviesPerActorMap,
} from "../utils/actors";
import { getCharactersWithMultipleActorsData } from "../utils/characters";

export const getMarvelMovies = async (): Promise<MovieType[]> => {
  try {
    const storedMovies = await Movie.find();

    if (storedMovies.length > 0) {
      console.log("Movies fetched from the database");
      return storedMovies as unknown as MovieType[];
    }

    console.log("Fetching movies from API");
    const data = await getMovies(marvel_company_id);
    await insertMoviesToDb(data.results);

    return data.results;
  } catch (error) {
    console.error("Error fetching Marvel movies:", error);
    return [];
  }
};

export const getActorsWithMultipleCharacters = async (
  req: Request,
  res: Response
) => {
  try {
    const actorMap = await getActorMap();
    const filteredActorMap = filterActorsWithMultipleCharacters(actorMap);
    res.json(filteredActorMap);
  } catch (error) {
    console.error("Error fetching characters with multiple actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMoviesPerActor = async (req: Request, res: Response) => {
  try {
    const moviesPerActorMap = await getMoviesPerActorMap();
    res.json(moviesPerActorMap);
  } catch (error) {
    console.error("Error fetching movies per actor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCharactersWithMultipleActors = async (
  req: Request,
  res: Response
) => {
  try {
    const filteredCharacterMap = await getCharactersWithMultipleActorsData();
    res.json(filteredCharacterMap);
  } catch (error) {
    console.error("Error fetching characters with multiple actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
