import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import styled from "styled-components";

const CustomAccordionSummary = styled(Accordion)`
  background-color: #1e1e1e !important;
  color: #ffffff !important;
  &:hover {
    background-color: #333333;
  }
`;

const ActorName = styled(Typography)`
  font-weight: bold;
  color: #fff;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

interface ActorAccordionProps {
  actorName: string;
  children: React.ReactNode;
}

const ActorAccordion: React.FC<ActorAccordionProps> = ({
  actorName,
  children,
}) => {
  return (
    <CustomAccordionSummary>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <ActorName variant="h6">{actorName.replace(/_/g, ".")}</ActorName>
      </AccordionSummary>
      <StyledAccordionDetails>{children}</StyledAccordionDetails>
    </CustomAccordionSummary>
  );
};

export default ActorAccordion;
