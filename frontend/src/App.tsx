import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import MoviesPerActor from "./pages/MoviesPerActor";
import CharactersWithMultipleActors from "./pages/CharactersWithMultipleActors";
import ActorsWithMultipleCharacters from "./pages/ActorsWithMultipleCharacters";
import { useMarvel } from "./hooks/useMarvel";
import Loader from "./components/ui/Loader";

const App = () => {
  const { loading } = useMarvel();

  return (
    <Router>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies-per-actor" element={<MoviesPerActor />} />
        <Route
          path="/actors-with-multiple-characters"
          element={<ActorsWithMultipleCharacters />}
        />
        <Route
          path="/characters-with-multiple-actors"
          element={<CharactersWithMultipleActors />}
        />
      </Routes>
    </Router>
  );
};

export default App;
