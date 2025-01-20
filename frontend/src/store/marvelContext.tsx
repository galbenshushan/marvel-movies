import React, { createContext, ReactNode, useState } from "react";
import {
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
  getMovies,
  getMoviesPerActor,
} from "../services/marvelService";
import { Actor, Character, MarvelContextType } from "../types/api";

export const MarvelContext = createContext<MarvelContextType | undefined>(
  undefined
);

export const MarvelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [moviesPerActor, setMoviesPerActor] = useState<any[]>([]);
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchMoviesPerActor = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoviesPerActor(page);
      setMoviesPerActor((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
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
      const data = await getActorsWithMultipleCharacters();
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
      setCharacters(data);
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
        actors,
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
