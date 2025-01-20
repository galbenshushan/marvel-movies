import mongoose from "mongoose";
import { MovieType } from "../types/general";
import Movie from "../models/Movie";

export const connectToDatabase = async (dbUri: string): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export const insertMoviesToDb = async (movies: MovieType[]): Promise<void> => {
  try {
    const moviePromises = movies.map(async (movie) => {
      await Movie.updateOne(
        { id: movie.id },
        {
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
        },
        { upsert: true }
      );
    });

    await Promise.all(moviePromises);
    console.log("Movies inserted/updated in the database");
  } catch (error) {
    console.error("Error inserting movies into the database:", error);
  }
};
