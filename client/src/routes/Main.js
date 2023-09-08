import { Box, Container, Button, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { getRandomChar, getSpecialChar } from "../utils/utils";
import useForm from "../utils/useForm";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../utils/UserContext";
import ScaleLoader from "react-spinners/ScaleLoader";

const Main = () => {
  const { loggedInUser } = useContext(UserContext);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user, isLoading } = useAuth0();
  const [values, setValues] = useForm({
    labelFor: "",
    length: 8,
    upperCase: true,
    lowerCase: false,
    number: true,
    symbol: false,
  });
  const [result, setResult] = useState("");

  const fieldsArray = [
    {
      field: values.upperCase,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: values.lowerCase,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar(),
    },
  ];

  const handleGeneratePassword = (e) => {
    e.preventDefault();

    let generatedPassword = "";

    const checkedFields = fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);

      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }

    if (generatedPassword) {
      setResult(generatedPassword);
      console.log({
        "new password": result,
        "user e-mail": user?.email,
        "password for": values.labelFor,
      });
    } else {
      toast.error("Please check at least one field");
    }
  };

  const handleCopyPassword = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard!");
    } else {
      toast.error("No password to copy.");
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    fetch("/add-new-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        labelFor: values.labelFor,
        password: result,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success("Password saved successfully");
          setRefresh(!refresh);
          setResult("");
          // Reset the form fields to their initial state
          setValues({
            labelFor: "",
            length: 8,
            upperCase: true,
            lowerCase: false,
            number: true,
            symbol: false,
          });
        } else if (data.status === 500) {
          toast.error("Failed to save password.");
        }
      });
  };

  useEffect(() => {
    // Check if user.email exists before making the fetch request
    if (user) {
      fetch("/add-new-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
      fetch(`/get-passwords/${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSavedPasswords(data.data);
        })
        .catch((error) => {
          console.error("Error fetching passwords:" + error);
        });
    }
  }, [user, loggedInUser, refresh]);

  const handleDelete = (e, id) => {
    e.preventDefault();

    fetch(`/delete-password/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loggedInUser.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setRefresh(!refresh);
          toast.success("Password deleted successfully.");
        } else if (data.status === 404) {
          toast.error("Password not found.");
        }
      });
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        gap: 2,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        my: 2,
      }}
    >
      <Box
        sx={{
          width: 350,
          height: 400,
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
        }}
      >
        {/* this is a form */}
        <form className="input-container">
          <div className="pw-output-container">
            <input
              readOnly
              type="text"
              placeholder="Minimum 8 Characters"
              className="pw-output"
              value={result}
            />
            <div onClick={handleCopyPassword}>
              <ContentCopyIcon sx={{ margin: 0.5, cursor: "pointer" }} />
            </div>
          </div>
          <div className="checkbox-div">
            <div className="label-div">
              <label htmlFor="pw-name">Used for:</label>
              <input
                type="text"
                className="pw-name-input"
                id="labelFor"
                name="labelFor"
                value={values.labelFor}
                onChange={setValues}
              />
            </div>
            <div className="label-div">
              <label htmlFor="length">Length:</label>
              <input
                type="number"
                min="8"
                max="20"
                id="length"
                name="length"
                value={values.length}
                onChange={setValues}
              />
            </div>
            <div className="label-div">
              <label htmlFor="upper-case"> Upper Case:</label>
              <input
                type="checkbox"
                id="upperCase"
                name="upperCase"
                checked={values.upperCase}
                onChange={setValues}
              />
            </div>

            <div className="label-div">
              <label htmlFor="lower-case"> Lower Case:</label>
              <input
                type="checkbox"
                id="lowerCase"
                name="lowerCase"
                checked={values.lowerCase}
                onChange={setValues}
              />
            </div>

            <div className="label-div">
              <label htmlFor="number"> Number:</label>
              <input
                type="checkbox"
                id="number"
                name="number"
                checked={values.number}
                onChange={setValues}
              />
            </div>

            <div className="label-div">
              <label htmlFor="symbol"> Symbol:</label>
              <input
                type="checkbox"
                id="symbol"
                name="symbol"
                checked={values.symbol}
                onChange={setValues}
              />
            </div>
          </div>
          <div className="button-div">
            <Button
              variant="contained"
              className="form-button"
              onClick={(e) => {
                handleGeneratePassword(e);
              }}
            >
              Generate
            </Button>
            <Button
              onClick={(e) => {
                handleSavePassword(e);
              }}
              variant="contained"
              className="form-button"
            >
              Save
            </Button>
          </div>
          {/* this is a form */}
        </form>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            width: 350,
            height: 400,
            backgroundColor: "secondary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <div className="loading">
            <ScaleLoader />
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            width: 350,
            height: 400,
            backgroundColor: "secondary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <div className="saved-passwords">
            {savedPasswords.map((entry, index) => (
              <div key={index} className="password-card">
                <Typography variant="h6" className="icon-div">
                  <div>
                    <strong>Password for:</strong> {entry.labelFor}
                  </div>
                  <DeleteIcon
                    sx={{ margin: 0.5, cursor: "pointer" }}
                    onClick={(e) => handleDelete(e, entry.id)}
                  />
                </Typography>
                <Typography variant="h6">
                  <div className="icon-div">
                    <span className="password">{entry.password}</span>
                    <ContentCopyIcon sx={{ margin: 0.5, cursor: "pointer" }} />
                  </div>
                </Typography>
              </div>
            ))}
          </div>
        </Box>
      )}
    </Container>
  );
};

export default Main;
