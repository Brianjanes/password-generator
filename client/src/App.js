import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Main from "./routes/Main";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#565E45", // primary color
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
          <Route path="/" element={<Login theme={theme} />} />
          <Route path="/main" element={<Main theme={theme} />} />
        </Routes>

        <Footer theme={theme} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
