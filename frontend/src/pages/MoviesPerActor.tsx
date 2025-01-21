import { useMarvel } from "../hooks/useMarvel";
import LineLoader from "../components/ui/LineLoader";
import MoviesCollapse from "../components/moviesPerActors/MoviesCollapse";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useEffect } from "react";
import useScroll from "../hooks/useScroll";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MoviesPerActor = () => {
  const { moviesPerActor, fetchMoviesPerActor, loading, fetchMovies, movies } =
    useMarvel();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
    if (moviesPerActor.length === 0) {
      fetchMoviesPerActor();
    }
  }, []);

  useScroll({ fetchRequest: fetchMoviesPerActor });

  return (
    <Container>
      <h1>Movies per Actor</h1>
      {moviesPerActor.map((actor) => (
        <MoviesCollapse actor={actor} key={uuidv4()} />
      ))}
      {loading && <LineLoader />}
    </Container>
  );
};

export default MoviesPerActor;
