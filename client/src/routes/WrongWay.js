import React from "react";
import { Container, Typography } from "@mui/material";
import AuthButton from "../components/AuthButton";
import { useAuth0 } from "@auth0/auth0-react";

const WrongWay = () => {
  const { user, isAuthenenticated } = useAuth0();

  return !user && !isAuthenenticated ? (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "80vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <Typography sx={{ color: "red" }} variant="h3">
        Hey you gotta log in!!
      </Typography>
      <AuthButton />
    </Container>
  ) : (
    <div>
      <Typography variant="h3">Loading</Typography>
    </div>
  );
};

export default WrongWay;
