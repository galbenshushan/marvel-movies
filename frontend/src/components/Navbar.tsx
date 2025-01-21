import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import { navButtons } from "../consts/routes";
import NavButton from "./ui/NavButton";
import logo from "../assets/logo.jpg";

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

const Logo = styled("img")({
  height: "60px",
  width: "auto",
  objectFit: "contain",
});

const Navbar = () => {
  const location = useLocation();

  return (
    <StyledAppBar position="static">
      <StyledBox>
        <StyledToolbar>
          <Logo src={logo} alt="Marvel Logo" />

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
