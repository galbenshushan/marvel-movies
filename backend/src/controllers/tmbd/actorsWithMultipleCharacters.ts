import { Request, Response } from "express";
import {
  filterActorsWithMultipleCharacters,
  getActorMap,
} from "../../utils/actors";
import ActorsWithMultipleCharactersModel from "../../models/ActorsWithMultipleCharacters";

export const getActorsWithMultipleCharacters = async (
  req: Request,
  res: Response
) => {
  try {
    const existingData = await ActorsWithMultipleCharactersModel.find();

    if (existingData && existingData.length > 0) {
      res.json(existingData);
    } else {
      const actorMap = await getActorMap();
      const filteredActorMap = filterActorsWithMultipleCharacters(actorMap);

      const newActorsWithMultipleCharactersData = Object.entries(
        filteredActorMap
      ).map(([actorName, characters]) => {
        const formattedCharacters = characters.map((character: any) =>
          typeof character === "object" && character.characterName
            ? character.characterName
            : JSON.stringify(character)
        );

        return new ActorsWithMultipleCharactersModel({
          actorName,
          characters: formattedCharacters,
        });
      });

      try {
        await ActorsWithMultipleCharactersModel.insertMany(
          newActorsWithMultipleCharactersData
        );
        console.log("Inserted actors with multiple characters data into DB.");
      } catch (dbError) {
        console.error(
          "Error saving actors with multiple characters data:",
          dbError
        );
      }

      res.json(filteredActorMap);
    }
  } catch (error) {
    console.error("Error fetching actors with multiple characters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
