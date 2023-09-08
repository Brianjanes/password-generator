"use strict";

// Dependencies
// ============================================================================
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Sets up the Express App
// ============================================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Any requests for static files will go into the public folder
// ============================================================================
app.use(express.static("public"));

// Setting up Express.
// ============================================================================
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Bringing in handlers.
// ============================================================================

const {
  getUserByEmail,
  newUser,
  savePassword,
  deletePassword,
  getPasswords,
} = require("./handlers/Handlers");

//Routes
// ============================================================================
app.get("/", (req, res) => {
  res.send("i farded");
});

app.get("/users/:email", getUserByEmail);
app.get("/get-passwords/:email", getPasswords);
app.post("/add-new-user", newUser);
app.post("/add-new-password", savePassword);
app.delete("/delete-password/:id", deletePassword);

// This is our catch all endpoint.
// ============================================================================
app.get("*", (request, response) => {
  return response.status(404).json({
    status: 404,
    message: "Nothing to see here.",
  });
});

// Starts the Express app
// ============================================================================
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
