export interface MarvelContextType {
  actors: Actor[];
  characters: Character[];
  moviesPerActor: MoviesPerActorResponse | null;
  movies: any[];
  loading: boolean;
  error: string | null;
  fetchActors: () => Promise<void>;
  fetchCharacters: () => Promise<void>;
  fetchMoviesForActor: (actorId: string) => Promise<void>;
  fetchMovies: () => Promise<void>;
}

export interface Actor {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
}

export interface MoviesPerActorResponse {
  actor: Actor;
  movies: Movie[];
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