import { useContext } from "react";
import { MarvelContextType } from "../types/api";
import { MarvelContext } from "../store/marvelContext";

export const useMarvel = (): MarvelContextType => {
  const context = useContext(MarvelContext);
  if (!context) {
    throw new Error("useMarvel must be used within a MarvelProvider");
  }
  return context;
};
