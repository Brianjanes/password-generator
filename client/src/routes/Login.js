import { Container } from "@mui/material";
import React from "react";
import AuthButton from "../components/AuthButton";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { user } = useAuth0();

  return (
    <Container maxWidth="sm">
      Maybe This is going to have something written here
      <br />
      <AuthButton />
    </Container>
  );
};

export default Login;
