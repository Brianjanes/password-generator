import { Container } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <ul>
        <li>
          <a href="/login/">Login</a>
        </li>
        <li>
          <a href="/logout/">Logout</a>
        </li>
      </ul>
    </Container>
  );
};

export default Login;
