import React from "react";
import styled from "styled-components";
import { useMarvel } from "../../hooks/useMarvel";
import TinyMovieCard from "../TinyMovieCard";

interface MoviesGridProps {
  actorMovies: string[];
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;
const MoviesGrid: React.FC<MoviesGridProps> = ({ actorMovies }) => {
  const { movies } = useMarvel();
  return (
    <GridContainer>
      {actorMovies.map((movie: string) => {
        const matchedMovie = movies.find((m) => m.title === movie);
        return matchedMovie ? <TinyMovieCard movie={matchedMovie} /> : null;
      })}
    </GridContainer>
  );
};

export default MoviesGrid;
