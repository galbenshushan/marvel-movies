import { v4 as uuidv4 } from "uuid";
import { useMarvel } from "../hooks/useMarvel";
import ActorAccordion from "../components/ActorAccordion";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { CharacterEntry, CharactersWithMultipleActorsType } from "../types/api";
import { useEffect } from "react";
import LineLoader from "../components/ui/LineLoader";
import useScroll from "../hooks/useScroll";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CharactersWithMultipleActors = () => {
  const { fetchCharacters, characters, movies, fetchMovies, loading } =
    useMarvel();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
    if (characters.length === 0) {
      fetchCharacters();
    }
  }, []);

  useScroll({ fetchRequest: fetchCharacters });

  return (
    <Container>
      <h1>Characters with Multiple Actors</h1>
      {characters.map((character: CharactersWithMultipleActorsType) => (
        <ActorAccordion actorName={character.characterName} key={uuidv4()}>
          {character.entries.map((entry: CharacterEntry) => (
            <Typography key={uuidv4()}>
              {entry.movieName} / {entry.actorName}
            </Typography>
          ))}
        </ActorAccordion>
      ))}
      {loading && <LineLoader />}
    </Container>
  );
};

export default CharactersWithMultipleActors;
