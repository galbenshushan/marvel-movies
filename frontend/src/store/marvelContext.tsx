import React, { createContext, ReactNode, useState } from "react";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMovies,
  getMoviesPerActor,
} from "../services/marvelService";
import {
  ActorsWithMultipleCharactersType,
  CharactersWithMultipleActorsType,
  MarvelContextType,
} from "../types/api";

export const MarvelContext = createContext<MarvelContextType | undefined>(
  undefined
);

export const MarvelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [actorsWithMultipleChars, setActorsWithMultipleChars] = useState<
    ActorsWithMultipleCharactersType[]
  >([]);
  const [characters, setCharacters] = useState<
    CharactersWithMultipleActorsType[]
  >([]);
  const [moviesPerActor, setMoviesPerActor] = useState<any[]>([]);
  const [movies, setMovies] = useState<any>([]);

  const [actorsPage, setActorsPage] = useState(1);
  const [charactersPage, setCharactersPage] = useState(1);
  const [moviesPerActorPage, setMoviesPerActorPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoviesPerActor = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoviesPerActor(moviesPerActorPage);
      setMoviesPerActor((prev) => [...prev, ...data]);
      setMoviesPerActorPage((prev) => prev + 1);
    } catch (err) {
      setError("Failed to fetch movies for actor");
    } finally {
      setLoading(false);
    }
  };

  const fetchActors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActorsWithMultipleCharacters(actorsPage);
      setActorsWithMultipleChars(data);
      setActorsPage((prev) => prev + 1);
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
      const data = await getCharactersWithMultipleActors(charactersPage);
      setCharacters(data);
      setCharactersPage((prev) => prev + 1);
    } catch (err) {
      setError("Failed to fetch characters with multiple actors");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovies();
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
        movies,
        actorsWithMultipleChars,
        characters,
        moviesPerActor,
        loading,
        setLoading,
        error,
        fetchActors,
        fetchCharacters,
        fetchMoviesPerActor,
        fetchMovies,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};
