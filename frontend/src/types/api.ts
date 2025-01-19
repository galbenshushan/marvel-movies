export interface MarvelContextType {
  actors: Actor[];
  characters: Character[];
  movies: MoviesPerActorResponse | null;
  loading: boolean;
  error: string | null;
  fetchActors: () => Promise<void>;
  fetchCharacters: () => Promise<void>;
  fetchMoviesForActor: (actorId: string) => Promise<void>;
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
