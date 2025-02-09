import React from "react";
import styled from "styled-components";
import { useMarvel } from "../../hooks/useMarvel";
import TinyMovieCard from "../TinyMovieCard";
import { v4 as uuidv4 } from "uuid";

interface MoviesGridProps {
  relatedMovies: string[];
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;
const MoviesGrid: React.FC<MoviesGridProps> = ({ relatedMovies }) => {
  const { movies } = useMarvel();
  return (
    <GridContainer>
      {relatedMovies.map((movie: string) => {
        const matchedMovie = movies.find((m) => m.title === movie);
        return matchedMovie ? (
          <TinyMovieCard movie={matchedMovie} key={uuidv4()} />
        ) : null;
      })}
    </GridContainer>
  );
};

export default MoviesGrid;
