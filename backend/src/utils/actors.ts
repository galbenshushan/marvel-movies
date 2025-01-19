import { getMarvelMovies } from "../controllers/tmbdController";
import { getActorCredits } from "../services/tmdbService";
import { MoviesPerActorMap } from "../types/general";

interface ActorMap {
  [actorName: string]: { movieName: string; characterName: string }[];
}

export const getActorMap = async (): Promise<ActorMap> => {
  const marvelMovies = await getMarvelMovies();

  const actorMap: ActorMap = {};

  for (const movie of marvelMovies) {
    const actors = await getActorCredits(movie.id);

    actors.forEach((actor: any) => {
      const { name: actorName, character } = actor;

      if (!actorMap[actorName]) {
        actorMap[actorName] = [];
      }

      actorMap[actorName].push({
        movieName: movie.title,
        characterName: character,
      });
    });
  }

  return actorMap;
};

export const filterActorsWithMultipleCharacters = (
  actorMap: ActorMap
): ActorMap => {
  const filteredActorMap: ActorMap = {};

  Object.entries(actorMap).forEach(([actorName, entries]) => {
    const uniqueEntries = Array.from(
      new Map(entries.map((entry) => [entry.characterName, entry])).values()
    );
    if (uniqueEntries.length > 1) {
      filteredActorMap[actorName] = uniqueEntries;
    }
  });

  return filteredActorMap;
};

export const getMoviesPerActorMap = async (): Promise<MoviesPerActorMap> => {
  const marvelMovies = await getMarvelMovies();

  const moviesPerActorMap: MoviesPerActorMap = {};

  for (const movie of marvelMovies) {
    const actors = await getActorCredits(movie.id);

    actors.forEach((actor: any) => {
      const { name: actorName } = actor;

      if (!moviesPerActorMap[actorName]) {
        moviesPerActorMap[actorName] = [];
      }

      if (!moviesPerActorMap[actorName].includes(movie.title)) {
        moviesPerActorMap[actorName].push(movie.title);
      }
    });
  }

  return moviesPerActorMap;
};
