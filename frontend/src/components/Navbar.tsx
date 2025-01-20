import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import NavButton from "./ui/navButton";
import { navButtons } from "../consts/routes";

const StyledAppBar = styled(AppBar)({
  padding: "0",
  backgroundColor: "#202020",
boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.3)",
  height: "100px",
  display: "flex",
  justifyContent: "center",
});

const StyledBox = styled("div")({
  display: "flex",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  padding: "0 200px",
  width: "100%",
});

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  color: "#FFFFFF",
  flexGrow: 1,
});

const Navbar = () => {
  const location = useLocation();
  return (
    <StyledAppBar position="static">
      <StyledBox>
        <StyledToolbar>
          <StyledTypography variant="h4">MARVEL</StyledTypography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            {navButtons.map(({ label, path }) => (
              <NavButton
                key={path}
                path={path}
                label={label}
                isActive={location.pathname === path}
              />
            ))}
          </Box>
        </StyledToolbar>
      </StyledBox>
    </StyledAppBar>
  );
};

export default Navbar;
