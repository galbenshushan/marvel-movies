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
      const existingMovie = await Movie.findOne({ id: movie.id });
      if (!existingMovie) {
        const newMovie = new Movie({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          popularity: movie.popularity,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          genre_ids: movie.genre_ids,
        });

        await newMovie.save();
      }
    });

    await Promise.all(moviePromises);
    console.log("Movies inserted to the database");
  } catch (error) {
    console.error("Error inserting movies into the database:", error);
  }
};