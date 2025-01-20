import {
  ActorsWithMultipleCharactersType,
  CharactersWithMultipleActorsType,
} from "../types/api";
import { serverUrl } from "../consts/api";

export const getActorsWithMultipleCharacters = async (
  page: number
): Promise<ActorsWithMultipleCharactersType[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.REACT_APP_SERVER_URL || serverUrl
      }/marvel/actorsWithMultipleCharacters?page=${page}&limit=${100}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch actors with multiple characters");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCharactersWithMultipleActors = async (
  page: number
): Promise<CharactersWithMultipleActorsType[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.REACT_APP_SERVER_URL || serverUrl
      }/marvel/charactersWithMultipleActors?page=${page}&limit=${100}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch characters with multiple actors");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoviesPerActor = async (page: number): Promise<any[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.REACT_APP_SERVER_URL || serverUrl
      }/marvel/moviesPerActor?page=${page}&limit=${100}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies for actor");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovies = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.REACT_APP_SERVER_URL || serverUrl}/marvel/movies`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies for actor");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
