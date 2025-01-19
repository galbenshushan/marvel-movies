import { getMarvelMovies } from "../controllers/tmbdController";
import CharacterWithMultipleActorsModel from "../models/CharActors";
import { getActorCredits } from "../services/tmdbService";
import { CharacterWithMultipleActorsMap } from "../types/general";

export const getCharactersWithMultipleActorsData = async (): Promise<any> => {
  try {
    const marvelMovies = await getMarvelMovies();

    const characterMap: CharacterWithMultipleActorsMap = {};

    for (const movie of marvelMovies) {
      const actors = await getActorCredits(movie.id);

      actors.forEach((actor: any) => {
        const { name: actorName, character } = actor;

        if (!characterMap[character]) {
          characterMap[character] = [];
        }

        characterMap[character].push({
          movieName: movie.title,
          actorName,
        });
      });
    }

    const filteredCharacterMap: CharacterWithMultipleActorsMap = {};

    Object.entries(characterMap).forEach(([characterName, entries]) => {
      const uniqueActors = new Set(entries.map((entry) => entry.actorName));

      if (uniqueActors.size > 1) {
        filteredCharacterMap[characterName] = entries;
      }
    });

    for (const [characterName, entries] of Object.entries(
      filteredCharacterMap
    )) {
      if (!characterName || characterName.trim() === "") {
        console.warn(
          `Skipping character with empty or invalid name: ${characterName}`
        );
        return;
      }

      const existingData = await CharacterWithMultipleActorsModel.findOne({
        characterName,
      });

      if (existingData) {
        console.log(
          `Character ${characterName} already exists, skipping insert.`
        );
      } else {
        const newCharacterData = new CharacterWithMultipleActorsModel({
          characterName,
          entries,
        });

        try {
          await newCharacterData.save();
          console.log(`Inserted character: ${characterName}`);
        } catch (error) {
          console.error(`Error saving character ${characterName}:`, error);
        }
      }
    }

    return filteredCharacterMap;
  } catch (error) {
    console.error("Error fetching characters with multiple actors:", error);
    throw new Error("Internal Server Error");
  }
};
