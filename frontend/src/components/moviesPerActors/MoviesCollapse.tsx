import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
import MoviesGrid from "./moviesGrid";
import { MoviesPerActorType } from "../../types/api";

const CardContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  width: 100%;
  margin-bottom: 10px;
`;

const ActorName = styled(Typography)`
  font-weight: bold;
  color: #fff;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const CustomAccordionSummary = styled(Accordion)`
  background-color: #1e1e1e;
  color: #ffffff;
  &:hover {
    background-color: #333333;
  }
`;

const MoviesCollapse: React.FC<MoviesPerActorType> = ({ actor }) => {
  return (
    <CardContainer key={actor._id}>
      <CustomAccordionSummary>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ActorName variant="h6">
            {actor.actorName.replace(/_/g, ".")}
          </ActorName>
        </AccordionSummary>
        <StyledAccordionDetails>
          <MoviesGrid actorMovies={actor.movies} />
        </StyledAccordionDetails>
      </CustomAccordionSummary>
    </CardContainer>
  );
};

export default MoviesCollapse;
