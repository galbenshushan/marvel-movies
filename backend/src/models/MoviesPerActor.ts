import mongoose, { Schema, Document } from "mongoose";

interface MoviesPerActor extends Document {
  moviesPerActorMap: {
    [actorName: string]: string[];
  };
}

const MoviesPerActorSchema = new Schema<MoviesPerActor>({
  moviesPerActorMap: {
    type: Map,
    of: [String],
    required: true,
  },
});

const MoviesPerActorModel = mongoose.model<MoviesPerActor>(
  "MoviesPerActor",
  MoviesPerActorSchema
);

export default MoviesPerActorModel;
