import { Request, Response } from "express";
import { getMoviesPerActorMap } from "../../utils/actors";
import MoviesPerActorModel from "../../models/MoviesPerActor";

export const getMoviesPerActor = async (req: Request, res: Response) => {
  try {
    const existingData = await MoviesPerActorModel.find();

    if (existingData && existingData.length > 0) {
      res.json(existingData);
    } else {
      const moviesPerActorData = await getMoviesPerActorMap();

      const newMoviesPerActorData = Object.entries(moviesPerActorData).map(
        ([actorName, movies]) => {
          return new MoviesPerActorModel({
            actorName,
            movies,
          });
        }
      );

      try {
        await MoviesPerActorModel.insertMany(newMoviesPerActorData);
        console.log("Inserted movies per actor data into DB.");
      } catch (dbError) {
        console.error("Error saving movies per actor data:", dbError);
      }

      res.json(moviesPerActorData);
    }
  } catch (error) {
    console.error("Error fetching movies per actor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
