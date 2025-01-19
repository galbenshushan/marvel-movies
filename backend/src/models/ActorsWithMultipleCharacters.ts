import mongoose, { Schema, Document } from "mongoose";

interface ActorsWithMultipleCharacters extends Document {
  actorName: string;
  characters: string[];
}

const ActorsWithMultipleCharactersSchema = new Schema<ActorsWithMultipleCharacters>({
  actorName: {
    type: String,
    required: true,
  },
  characters: {
    type: [String],
    required: true,
  },
});

const ActorsWithMultipleCharactersModel = mongoose.model<ActorsWithMultipleCharacters>(
  "ActorsWithMultipleCharacters",
  ActorsWithMultipleCharactersSchema
);

export default ActorsWithMultipleCharactersModel;
