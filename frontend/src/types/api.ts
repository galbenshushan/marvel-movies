export interface MarvelContextType {
  actors: Actor[];
  characters: Character[];
  moviesPerActor: any[];
  movies: any[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  fetchActors: () => Promise<void>;
  fetchCharacters: () => Promise<void>;
  fetchMoviesPerActor: () => Promise<void>;
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

export interface IMoviesPerActor {
  _id: string;
  actorName: string;
  movies: string[];
}

export interface MoviesPerActorType {
  actor: IMoviesPerActor;
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
