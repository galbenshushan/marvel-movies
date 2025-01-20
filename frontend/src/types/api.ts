export interface MarvelContextType {
  actorsWithMultipleChars: ActorsWithMultipleCharactersType[];
  characters: CharactersWithMultipleActorsType[];
  moviesPerActor: MoviesPerActorType[];
  movies: any[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  fetchActors: () => Promise<void>;
  fetchCharacters: () => Promise<void>;
  fetchMoviesPerActor: () => Promise<void>;
  fetchMovies: () => Promise<void>;
}

export interface CharactersWithMultipleActorsType {
  _id: string;
  characterName: string;
  entries: CharacterEntry[];
}

export interface CharacterEntry {
  _id: string;
  actorName: string;
  movieName: string;
}
export interface Movie {
  id: string;
  title: string;
  year: number;
}

export interface MoviesPerActorType {
  _id: string;
  actorName: string;
  movies: string[];
}

export interface MoviesPerActorType {
  actor: MoviesPerActorType;
}

export interface ActorsWithMultipleCharactersType {
  _id: string;
  actorName: string;
  characters: string[];
}

export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
