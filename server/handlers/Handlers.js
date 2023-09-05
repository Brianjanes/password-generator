"use strict";
//MongoDB setup
//================================================================
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const db = client.db("pw-generator-db");
const usersCollection = db.collection("users");

//Using bcrypt to hash passwords before they get to the DB.
//================================================================
const bcrypt = require("bcrypt");

//This handler fires when the user logs in and checks if the user already has an account.
//================================================================
const newUser = async (request, response) => {
  const { userEmail } = request.body;
  try {
    const newUser = {
      email: userEmail,
      passwords: [],
    };
    const emailCheck = await usersCollection.findOne({ email: userEmail });
    if (emailCheck) {
      return response.status(200).json({
        status: 200,
        inDB: true,
        message: "Email already stored in DB",
      });
    } else {
      const newUserResult = await usersCollection.insertOne(newUser);
      if (!newUserResult.insertedId) {
        return response.status(502).json({
          status: 502,
          message: "Database error.",
        });
      }
      return response.status(200).json({
        status: 200,
        message: "User added successfully.",
        data: newUserResult,
      });
    }
  } catch (error) {
    console.log("newUser handler Error: " + error);
    return response.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
};

//This handler is for when a user has created a new password in the front-end.
//================================================================
const savePassword = async (request, response) => {
  const { userEmail, labelFor, password } = request.body;
  try {
    await client.connect();
    //make sure the user exists
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found.",
      });
    } else {
      //Has the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the passwords array for the user
      const updatedUser = await usersCollection.updateOne(
        { email: userEmail },
        { $push: { passwords: { labelFor, password: hashedPassword } } }
      );

      if (!updatedUser.modifiedCount) {
        return response.status(500).json({
          status: 500,
          message: "Failed to save password.",
        });
      } else {
        return response.status(200).json({
          status: 200,
          message: "Password saved successfully.",
        });
      }
    }
  } catch (error) {
    console.log("savePassword handler Error :" + error.message);
    return response.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  } finally {
    client.close();
  }
};

//This handler returns all of the users saved passwords to be displayed on their dashboard.
//============================================================================================
const getPasswords = async (request, response) => {
  try {
    await client.connect();
  } catch (error) {
    console.log("getPasswords handler Error :" + error.message);
    return response.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  } finally {
    client.close();
  }
};

const deletePassword = async (request, response) => {
  try {
    await client.connect();
  } catch (error) {
    console.log("deletePassword handler Error :" + error.message);
    return response.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  } finally {
    client.close();
  }
};

module.exports = { savePassword, getPasswords, deletePassword, newUser };