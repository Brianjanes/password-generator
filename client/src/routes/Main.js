import { Box, Container, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { useForm } from "../utils/useForm";
import { getRandomChar, getSpecialChar } from "../utils/utils";
import { useForm } from "react-hook-form";
import "../App.css";

const Main = () => {
  const { register, handleSubmit } = useForm();
  const [newPassword, setNewPassword] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
    toast.success("Password Generated");
  };
  // const [values, setValues] = useForm({
  //   labelFor: "",
  //   length: 8,
  //   upperCase: true,
  //   lowerCase: true,
  //   number: false,
  //   symbol: false,
  // });
  // const [result, setResult] = useState("");

  // const fieldsArray = [
  //   {
  //     field: values.upperCase,
  //     getChar: () => getRandomChar(65, 90),
  //   },
  //   {
  //     field: values.lowerCase,
  //     getChar: () => getRandomChar(97, 122),
  //   },
  //   {
  //     field: values.number,
  //     getChar: () => getRandomChar(48, 57),
  //   },
  //   {
  //     field: values.symbol,
  //     getChar: () => getSpecialChar(),
  //   },
  // ];

  // const handleGenerate = (e) => {
  //   e.preventDefault();
  //   let generatedPassword = "";
  //   const checkedFields = fieldsArray.filter(({ field }) => field);

  //   for (let i = 0; i < values.length; i++) {
  //     const index = Math.floor(Math.random() * checkedFields.length);
  //     const letter = checkedFields[index]?.getChar();

  //     if (letter) {
  //       generatedPassword += letter;
  //     }
  //   }
  //   if (generatedPassword) {
  //     console.log(generatedPassword);
  //     console.log(values);
  //     setResult(generatedPassword);
  //     // Reset the labelFor field after generating the password
  //     setValues({ ...values, labelFor: "" });
  //   } else {
  //     toast.error(" Please select at least one option");
  //   }
  // };

  // const handleClipboard = async () => {
  //   if (result) {
  //     await navigator.clipboard.writeText(result);
  //     toast.success("Copied to your clipboard");
  //   } else {
  //     toast.error("No password to copy");
  //   }
  // };

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
          <Toaster />
          <div className="pw-output-container">
            <input
              readOnly
              type="text"
              placeholder="Minimum 8 Characters"
              className="pw-output"
              // value={result}
            />
            {/* <div onClick={() => handleClipboard()}>
                <ContentCopyIcon sx={{ margin: 0.5, cursor: "pointer" }} />
              </div> */}
          </div>
          <div className="checkbox-div">
            <div className="label-div">
              <label htmlFor="pw-name">Used for:</label>
              <input
                {...register("labelFor")}
                type="text"
                className="pw-name-input"
                id="labelFor"
                name="labelFor"
                // value={values.label}
                // onChange={(e) => setValues(e)}
              />
            </div>
            <div className="label-div">
              <label htmlFor="Length">Length:</label>
              <input
                {...register("length")}
                type="number"
                placeholder="8+"
                min="8"
                max="20"
                name="length"
                id="length"
                // value={values.length}
                // onChange={(e) => setValues(e)}
                // required={true}
              />
            </div>
            <div className="label-div">
              <label htmlFor="Upper Case"> Upper Case:</label>
              <input
                {...register("upperCase")}
                type="checkbox"
                id="upperCase"
                name="upperCase"
                // checked={values.upperCase}
                // onChange={(e) => setValues(e)}
              />
            </div>

            <div className="label-div">
              <label htmlFor="Lower Case"> Lower Case:</label>
              <input
                {...register("lowerCase")}
                type="checkbox"
                id="lowerCase"
                name="lowerCase"
                // checked={values.lowerCase}
                // onChange={(e) => setValues(e)}
              />
            </div>

            <div className="label-div">
              <label htmlFor="Number"> Number:</label>
              <input
                {...register("number")}
                type="checkbox"
                id="number"
                name="number"
                // checked={values.number}
                // onChange={(e) => setValues(e)}
              />
            </div>

            <div className="label-div">
              <label htmlFor="Symbol"> Symbol:</label>
              <input
                {...register("symbol")}
                type="checkbox"
                id="symbol"
                name="symbol"
                // checked={values.symbol}
                // onChange={(e) => setValues(e)}
              />
            </div>
          </div>
          <div className="button-div">
            <Button
              variant="contained"
              className="form-button"
              onClick={handleSubmit(onSubmit)}
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

      <Box
        sx={{
          width: 350,
          height: 400,
          backgroundColor: "secondary.main",
        }}
      ></Box>
    </Container>
  );
};

export default Main;
