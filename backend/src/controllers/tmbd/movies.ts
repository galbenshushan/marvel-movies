import { Request, Response } from "express";
import { getMarvelMovies } from "../../utils/movies";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMarvelMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
