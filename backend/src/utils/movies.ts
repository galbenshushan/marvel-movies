import { marvel_company_id } from "../consts/general";
import Movie from "../models/Movie";
import { insertMoviesToDb } from "../services/dbService";
import { getMovies } from "../services/tmdbService";
import { MovieType } from "../types/general";

export const getMarvelMovies = async (): Promise<MovieType[]> => {
  try {
    const storedMovies: MovieType[] = await Movie.find();

    if (storedMovies.length > 0) {
      console.log("Movies fetched from the database");
      return storedMovies;
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
