import mongoose, { Schema, Document } from "mongoose";

interface MoviesPerActor extends Document {
  actorName: string;
  movies: string[];
}

const MoviesPerActorSchema = new Schema<MoviesPerActor>({
  actorName: {
    type: String,
    required: true,
  },
  movies: {
    type: [String],
    required: true,
  },
});

const MoviesPerActorModel = mongoose.model<MoviesPerActor>(
  "MoviesPerActor",
  MoviesPerActorSchema
);

export default MoviesPerActorModel;
