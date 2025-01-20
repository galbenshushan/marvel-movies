import { Request, Response } from "express";
import { getMoviesPerActorMap } from "../../utils/actors";
import MoviesPerActorModel from "../../models/MoviesPerActor";

export const getMoviesPerActor = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;

    const skip = (page - 1) * limit;

    const moviesPerActorData = await MoviesPerActorModel.find()
      .skip(skip)
      .limit(limit);

    if (moviesPerActorData && moviesPerActorData.length > 0) {
      res.json(moviesPerActorData);
    } else {
      const newMoviesPerActorData = await getMoviesPerActorMap();

      const selectedMoviesPerActorData = Object.entries(newMoviesPerActorData)
        .slice(skip, skip + limit)
        .map(([actorName, movies]) => {
          return new MoviesPerActorModel({
            actorName,
            movies,
          });
        });

      try {
        await MoviesPerActorModel.insertMany(selectedMoviesPerActorData);
        console.log("Inserted new movies per actor data into DB.");
      } catch (dbError) {
        console.error("Error saving movies per actor data:", dbError);
      }

      res.json(selectedMoviesPerActorData);
    }
  } catch (error) {
    console.error("Error fetching movies per actor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
