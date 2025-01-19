export interface IMovie extends Document {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}