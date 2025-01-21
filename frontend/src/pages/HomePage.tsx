import { useMarvel } from "../hooks/useMarvel";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";
import { MovieType } from "../types/api";
import { v4 as uuidv4 } from "uuid";
import banner from "../assets/MarvelBanner.jpg";
import { useEffect } from "react";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #121212;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
`;

const HomePage = () => {
  const { fetchMovies, movies } = useMarvel();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, []);

  return (
    <>
      <Banner />
      <GridContainer>
        {movies.map((movie: MovieType) =>
          movies ? <MovieCard key={uuidv4()} movie={movie} /> : null
        )}
      </GridContainer>
    </>
  );
};

export default HomePage;
