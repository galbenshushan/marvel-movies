import { Request, Response } from "express";
import { getCharactersWithMultipleActorsData } from "../../utils/characters";
import CharacterWithMultipleActorsModel from "../../models/CharacterWithMultipleActors";

export const getCharactersWithMultipleActors = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const existingData = await CharacterWithMultipleActorsModel.find()
      .skip(skip)
      .limit(limit);

    if (existingData?.length > 0) {
      res.json(existingData);
    } else {
      const filteredCharacterMap = await getCharactersWithMultipleActorsData();
      console.log(filteredCharacterMap.length);

      const validCharacterData = filteredCharacterMap.filter(
        (character: any) => character.characterName
      );

      if (validCharacterData?.length > 0) {
        try {
          await CharacterWithMultipleActorsModel.insertMany(validCharacterData);
          console.log(
            "Inserted valid characters with multiple actors data into DB."
          );
        } catch (dbError) {
          console.error(
            "Error saving characters with multiple actors data:",
            dbError
          );
        }

        if (Array.isArray(filteredCharacterMap)) {
          res.json(filteredCharacterMap.slice(skip, skip + limit));
        } else {
          console.error(
            "Invalid data format for filteredCharacterMap:",
            filteredCharacterMap
          );
          res.status(500).json({ error: "Invalid data format for characters" });
        }
      } else {
        console.warn(
          "Skipping characters with invalid or missing characterName"
        );
        res.status(500).json({ error: "No valid character data to insert" });
      }
    }
  } catch (error) {
    console.error("Error fetching characters with multiple actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
