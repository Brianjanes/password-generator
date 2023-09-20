import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AuthButton from "../components/AuthButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Box
          sx={{
            width: 350,
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <Typography variant="h5">
            Welcome to my little password generator web app
          </Typography>
        </Box>
        <br />
        <AuthButton />
      </Container>
    );
  } else {
    navigate("/main");
  }
};

export default Login;
