import { v4 as uuidv4 } from "uuid";
import { useMarvel } from "../hooks/useMarvel";
import ActorAccordion from "../components/ActorAccordion";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { CharacterEntry, CharactersWithMultipleActorsType } from "../types/api";
import { useEffect } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CharactersWithMultipleActors = () => {
  const { fetchCharacters, characters, movies, fetchMovies } = useMarvel();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
    if (characters.length === 0) {
      fetchCharacters();
    }
  }, []);

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
    </Container>
  );
};

export default CharactersWithMultipleActors;
