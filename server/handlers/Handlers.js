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
// const bcrypt = require("bcrypt");\

//Using uuid to generate unique IDs for each password/label pair.
//================================================================
const { v4: uuidv4 } = require("uuid");

//This handler is getting a user by email
//================================================================
const getUserByEmail = async (request, response) => {
  const { email } = request.params;
  const newClient = new MongoClient(MONGO_URI, options);
  const newDb = newClient.db("pw-generator-db");
  const usersCollection = newDb.collection("users");
  try {
    await newClient.connect();
    const user = await usersCollection.findOne({ email });
    if (user) {
      return response.status(200).json({
        status: 200,
        data: user,
      });
    } else if (!user) {
      return response.status(404).json({
        status: 404,
        data: "User not found",
      });
    } else {
      return response.status(500).json({
        status: 500,
        data: "Internal server error",
      });
    }
  } catch (error) {
    console.log("getUserByEmail handler Error: " + error);
    return response.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    newClient.close();
  }
};

//This handler fires when the user logs in and checks if the user already has an account.
//================================================================
const newUser = async (request, response) => {
  const { userEmail } = request.body;
  try {
    await client.connect();
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
      } else {
        return response.status(200).json({
          status: 200,
          message: "User added successfully.",
          data: newUserResult,
        });
      }
    }
  } catch (error) {
    console.log("newUser handler Error: " + error);
    return response.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

//This handler is for when a user has created a new password in the front-end.
//================================================================
const savePassword = async (request, response) => {
  const { userEmail, labelFor, password } = request.body;
  try {
    await client.connect();
    //Make sure the user exists
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found.",
      });
    } else {
      //Has the password using bcrypt
      // const hashedPassword = await bcrypt.hash(password, 13);

      //Create a new uuid id
      //================================================================
      const newId = uuidv4();

      //Update the passwords array for the user with the incoming label, password, and uuid.
      const updatedUser = await usersCollection.updateOne(
        { email: userEmail },
        { $push: { passwords: { labelFor, password, id: newId } } }
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
  const { email } = request.params;
  try {
    await client.connect();

    const user = await usersCollection.findOne({ email: email });
    if (user) {
      return response.status(200).json({
        status: 200,
        data: user.passwords,
      });
    }
  } catch (error) {
    console.log("getPasswords handler Error :" + error.message);
    return response.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  }
};

//This is to delete a oassword from the DB
//============================================================
const deletePassword = async (request, response) => {
  const { id } = request.params;
  const { email } = request.body;
  try {
    await client.connect();

    const findEmail = await usersCollection.findOne({ email: email });

    // Use projection to filter the passwords array by id
    const deleteRequest = await usersCollection.findOne(
      { email: email, "passwords.id": id },
      { projection: { "passwords.$": 1 } }
    );
    console.log(deleteRequest);

    if (deleteRequest) {
      const deletedPassword = deleteRequest.passwords[0]; // Access the first (and only) matching password
      console.log(deletedPassword);

      // Now, you can perform your delete operation if needed.
      // For example, if you want to remove the password with the specified id:
      const checkDelete = await usersCollection.updateOne(
        { email: email },
        { $pull: { passwords: { id: id } } }
      );
      if (checkDelete.acknowledged) {
        return response.status(200).json({
          status: 200,
          message: "Password found and accessed successfully.",
          password: deletedPassword,
        });
      } else {
        return response.status(404).json({
          status: 404,
          message: "Password not found.",
        });
      }
    }
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

module.exports = {
  getUserByEmail,
  savePassword,
  getPasswords,
  deletePassword,
  newUser,
};
