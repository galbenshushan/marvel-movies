import dotenv from "dotenv";
import { emptyMovieResult } from "../consts/general";
import { MovieType, MovieResponse } from "../types/general";
dotenv.config();

export const getMovies = async (id: number): Promise<MovieResponse> => {
  let allMovies: MovieType[] = [];
  let currentPage = 1;
  let totalPages = 1;
  try {
    while (currentPage <= totalPages) {
      const response = await fetch(
        `${process.env.BASE_URL}/discover/movie?with_companies=${id}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data from TMDB");
      }

      const data = await response.json();

      allMovies = allMovies.concat(data.results);
      totalPages = data.total_pages;
      currentPage++;
    }

    return {
      results: allMovies,
      total_pages: totalPages,
      total_results: allMovies.length,
    };
  } catch (error) {
    console.error("Error fetching Marvel movies:", error);
    return emptyMovieResult;
  }
};

export const getActorCredits = async (movieId: number): Promise<any[]> => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/movie/${movieId}/credits`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const creditsData = await response.json();

    const actors = creditsData.cast.filter(
      (actor: any) => actor.known_for_department === "Acting"
    );

    return actors;
  } catch (error) {
    console.error("Error fetching credits:", error);
    return [];
  }
};
