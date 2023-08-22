import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2B2F23", // your primary color
    },
    secondary: {
      main: "#F6E27F", // your secondary color
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
