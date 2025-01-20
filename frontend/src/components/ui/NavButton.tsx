import { Button, ButtonProps, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<ButtonProps & { active?: boolean } & LinkProps>(({ active }) => ({
  color: active ? "#F2F2F2" : "#FFFFFF",
  borderBottom: `2px solid ${active ? "red" : "transparent"}`,
  borderRadius: "0",
  fontWeight: "bold",
  textTransform: "none",
  marginRight: "16px",
  fontSize: "21px",
  padding: "12px 50px",
  "&:hover": {
    borderBottom: "2px solid red",
    backgroundColor: "transparent",
  },
}));

interface NavButtonProps {
  path: string;
  label: string;
  isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ path, label, isActive }) => {
  return (
    <StyledButton key={path} component={Link} to={path} active={isActive}>
      {label}
    </StyledButton>
  );
};

export default NavButton;
