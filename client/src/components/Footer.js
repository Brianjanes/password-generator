import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer = ({ theme }) => {
  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary">
        {"by Brian Janes © "}
        <Link
          color="inherit"
          href="https://www.github.com/brianjanes"
          target="_blank"
        >
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          //trying out some colors here - not sure if final.
          backgroundColor: theme.palette.secondary.main,
          // backgroundColor: (theme) =>
          //   theme.palette.mode === "light"
          //     ? theme.palette.grey[200]
          //     : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Password Generator is a MERN stack application.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
