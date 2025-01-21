import { v4 as uuidv4 } from "uuid";
import { useMarvel } from "../hooks/useMarvel";
import ActorAccordion from "../components/ActorAccordion";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useEffect } from "react";
import LineLoader from "../components/ui/LineLoader";
import useScroll from "../hooks/useScroll";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface ActorsWithMultipleCharactersType {
  _id: string;
  actorName: string;
  characters: string[];
}

const ActorsWithMultipleCharacters = () => {
  const { fetchActors, actorsWithMultipleChars, movies, fetchMovies, loading } =
    useMarvel();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
    if (actorsWithMultipleChars.length === 0) {
      fetchActors();
    }
  }, []);

  useScroll({ fetchRequest: fetchActors });

  return (
    <Container>
      <h1>Actors with Multiple Characters</h1>
      {actorsWithMultipleChars.map(
        (actor: ActorsWithMultipleCharactersType) => (
          <ActorAccordion actorName={actor.actorName} key={uuidv4()}>
            {actor.characters.map((character) => (
              <Typography key={uuidv4()}>{character}</Typography>
            ))}
          </ActorAccordion>
        )
      )}
      {loading && <LineLoader />}
    </Container>
  );
};

export default ActorsWithMultipleCharacters;
