import mongoose, { Schema, Document } from 'mongoose';

interface ICharacterActor extends Document {
  characterName: string;
  movieName: string;
  actors: string[];
}

const characterActorSchema: Schema = new Schema(
  {
    characterName: { type: String, required: true, unique: true },
    movieName: { type: String, required: true },
    actors: { type: [String], required: true },
  },
  { timestamps: true }
);

const CharacterActor = mongoose.model<ICharacterActor>('CharacterActor', characterActorSchema);

export default CharacterActor;
