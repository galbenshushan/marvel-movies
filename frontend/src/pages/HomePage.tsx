import { useEffect } from "react";
import { useMarvel } from "../hooks/useMarvel";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

// Styled component for the grid container
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #121212;
`;

// Styled component for the banner section
const Banner = styled.div`
  width: 100%;
  height: 300px; // Set a height for the banner
  background-image: url("/src/assets/MarvelBanner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px; // Add some space between the banner and the grid
`;

const HomePage = () => {
  const { fetchMovies, movies } = useMarvel();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Banner /> {/* Banner section */}
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </GridContainer>
    </>
  );
};

export default HomePage;
