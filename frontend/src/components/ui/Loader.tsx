import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        color: "red",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)", //
        zIndex: 1000,
      }}
    >
      <CircularProgress size={50} color="error" />
    </div>
  );
};

export default Loader;
