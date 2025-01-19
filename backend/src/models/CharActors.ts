import mongoose, { Schema, Document } from 'mongoose';

interface CharacterWithMultipleActors extends Document {
  characterName: string;
  entries: { movieName: string; actorName: string }[];
}

const CharacterWithMultipleActorsSchema = new Schema<CharacterWithMultipleActors>({
  characterName: { type: String, required: true },
  entries: [
    {
      movieName: { type: String, required: true },
      actorName: { type: String, required: true },
    },
  ],
});

const CharacterWithMultipleActorsModel = mongoose.model<CharacterWithMultipleActors>(
  'CharacterWithMultipleActors',
  CharacterWithMultipleActorsSchema
);

export default CharacterWithMultipleActorsModel;
