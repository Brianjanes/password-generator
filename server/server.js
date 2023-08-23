"use strict";
const express = require("express");
const morgan = require("morgan");
const { auth } = require("express-openid-connect");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

const app = express();

// Any requests for static files will go into the public folder
app.use(express.static("public"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// this is our catch all endpoint.
app.get("*", (request, response) => {
  return response.status(404).json({
    status: 404,
    message: "Nothing to see here.",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
