import { Container } from "@mui/material";
import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <LoginButton />
      <LogoutButton />
    </Container>
  );
};

export default Login;
