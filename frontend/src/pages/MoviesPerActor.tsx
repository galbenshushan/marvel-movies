import { useEffect } from "react";
import { useMarvel } from "../hooks/useMarvel";
import LineLoader from "../components/ui/LineLoader";
import MoviesCollapse from "../components/moviesPerActors/MoviesCollapse";
import { v4 as uuidv4 } from "uuid";

const MoviesPerActor = () => {
  const { moviesPerActor, fetchMoviesPerActor, loading, fetchMovies } =
    useMarvel();

  useEffect(() => {
    fetchMovies();
    fetchMoviesPerActor();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading) {
        fetchMoviesPerActor();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movies per Actor</h1>
      {moviesPerActor.map((actor) => (
        <MoviesCollapse actor={actor} key={uuidv4()} />
      ))}
      {loading && <LineLoader />}
    </div>
  );
};

export default MoviesPerActor;
