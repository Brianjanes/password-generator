import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Generator from "./routes/Generator";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2B2F23", // primary color
    },
    secondary: {
      main: "#F6E27F", // secondary color
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header theme={theme} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
        <Footer theme={theme} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
