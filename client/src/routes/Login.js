import { Container } from "@mui/material";
import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { user } = useAuth0();

  return (
    <Container maxWidth="sm">
      <LoginButton />
      <LogoutButton />
      <div>
        {user && (
          <>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </>
        )}
      </div>
    </Container>
  );
};

export default Login;
