import { Box, Container, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { getRandomChar, getSpecialChar } from "../utils/utils";
import useForm from "../utils/useForm";
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const { user } = useAuth0();
  const [values, setValues] = useForm({
    labelFor: "",
    length: 8,
    upperCase: false,
    lowerCase: false,
    number: false,
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

  const handleSavePassword = () => {};

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
            <Button variant="contained" className="form-button">
              Save
            </Button>
          </div>
          {/* this is a form */}
        </form>
      </Box>

      {!user ? (
        <Box
          sx={{
            width: 350,
            height: 400,
            backgroundColor: "secondary.main",
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box
          sx={{
            width: 350,
            height: 400,
            backgroundColor: "secondary.main",
          }}
        >
          {user?.email}
        </Box>
      )}
    </Container>
  );
};

export default Main;
