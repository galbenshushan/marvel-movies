import { useEffect } from "react";
import "./App.css";
import { useMarvel } from "./hooks/useMarvel";

function App() {
  const { fetchCharacters } = useMarvel();

  useEffect(() => {
    fetchCharacters();
  }, []);

  return <>rrfrr</>;
}

export default App;
