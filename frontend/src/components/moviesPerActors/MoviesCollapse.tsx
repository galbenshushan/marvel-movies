import { MoviesPerActorType } from "../../types/api";
import ActorAccordion from "../ActorAccordion";
import MoviesGrid from "./MoviesGrid";

interface MoviesPerActorProps {
  actor: MoviesPerActorType;
}

const MoviesCollapse: React.FC<MoviesPerActorProps> = ({ actor }) => {
  return (
    <ActorAccordion actorName={actor.actorName}>
      <MoviesGrid relatedMovies={actor.movies} />
    </ActorAccordion>
  );
};

export default MoviesCollapse;
