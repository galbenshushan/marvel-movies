import { useEffect } from "react";
import { useMarvel } from "../hooks/useMarvel";

const ActorsWithMultipleCharacters = () => {
  const { fetchMovies } = useMarvel();

  useEffect(() => {
    fetchMovies();
  }, []);

  return <div>ActorsWithMultipleCharacters</div>;
};

export default ActorsWithMultipleCharacters;
