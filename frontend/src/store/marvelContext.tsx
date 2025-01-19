import React, { createContext, ReactNode, useState } from "react";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMoviesPerActor,
} from "../services/marvelService";
import {
  Actor,
  Character,
  MarvelContextType,
  MoviesPerActorResponse,
} from "../types/api";

export const MarvelContext = createContext<MarvelContextType | undefined>(
  undefined
);

export const MarvelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [movies, setMovies] = useState<MoviesPerActorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActorsWithMultipleCharacters();

      console.log(data);

      setActors(data);
    } catch (err) {
      setError("Failed to fetch actors with multiple characters");
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharactersWithMultipleActors();
      console.log(data);

      setCharacters(data);
    } catch (err) {
      setError("Failed to fetch characters with multiple actors");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesForActor = async (actorId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoviesPerActor(actorId);
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch movies for actor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarvelContext.Provider
      value={{
        actors,
        characters,
        movies,
        loading,
        error,
        fetchActors,
        fetchCharacters,
        fetchMoviesForActor,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};
