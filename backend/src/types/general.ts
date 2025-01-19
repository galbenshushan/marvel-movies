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

export interface MovieTitle {
  id: number;
  title: string;
}

export interface MovieResponse {
  results: MovieType[];
  total_pages: number;
  total_results: number;
}

export interface ActorData {
  movieName: string;
  characterName: string;
}

export interface ActorMap {
  [actorName: string]: ActorData[];
}

export interface MoviesPerActorMap {
  [actorName: string]: string[];
}

export interface CharacterWithMultipleActorsMap {
  [characterName: string]: { movieName: string; actorName: string }[];
}

