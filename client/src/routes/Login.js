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
      isLoading && (
        <Container maxWidth="sm">
          <Box>
            <Typography variant="h2">
              Welcome to my little password generator web app
            </Typography>
          </Box>
          <br />
          <AuthButton />
        </Container>
      )
    );
  } else {
    navigate("/main");
  }
};

export default Login;
