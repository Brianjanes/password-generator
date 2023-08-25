import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const AuthButton = () => {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  return !isAuthenticated ? (
    <Button color="inherit" onClick={() => loginWithRedirect()}>
      Login
    </Button>
  ) : (
    <Button color="inherit" onClick={() => logout()}>
      Logout
    </Button>
  );
};

export default AuthButton;
