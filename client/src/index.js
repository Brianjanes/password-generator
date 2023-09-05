import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./utils/UserContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = "http://localhost:3000/main";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUri,
    }}
  >
    <React.StrictMode>
      <UserProvider>
        <App />
        <Toaster />
      </UserProvider>
    </React.StrictMode>
  </Auth0Provider>
);
