import { Request, Response } from "express";
import { getCharactersWithMultipleActorsData } from "../../utils/characters";
import CharacterWithMultipleActorsModel from "../../models/CharacterWithMultipleActors";

export const getCharactersWithMultipleActors = async (
  req: Request,
  res: Response
) => {
  try {
    const existingData = await CharacterWithMultipleActorsModel.find();

    if (existingData.length > 0) {
      res.json(existingData);
    } else {
      const filteredCharacterMap = await getCharactersWithMultipleActorsData();
      res.json(filteredCharacterMap);
    }
  } catch (error) {
    console.error("Error fetching characters with multiple actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
