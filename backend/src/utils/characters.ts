import { getMarvelMovies } from "../controllers/tmbdController";
import { getActorCredits } from "../services/tmdbService";
import { CharacterWithMultipleActorsMap } from "../types/general";

export const getCharactersWithMultipleActorsData =
  async (): Promise<CharacterWithMultipleActorsMap> => {
    try {
      const marvelMovies = await getMarvelMovies();

      const characterMap: Record<
        string,
        { movieName: string; actorName: string }[]
      > = {};

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

      return filteredCharacterMap;
    } catch (error) {
      console.error("Error fetching characters with multiple actors:", error);
      throw new Error("Internal Server Error");
    }
  };
