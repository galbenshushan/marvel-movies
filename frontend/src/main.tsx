import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MarvelProvider } from "./store/marvelContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MarvelProvider>
      <App />
    </MarvelProvider>
  </StrictMode>
);
