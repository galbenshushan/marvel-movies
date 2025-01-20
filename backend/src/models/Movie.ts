import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types/models";

const movieSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: String, required: false },
    popularity: { type: Number, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true },
    backdrop_path: { type: String, required: false },
    poster_path: { type: String, required: false },
    genre_ids: { type: [Number], required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
