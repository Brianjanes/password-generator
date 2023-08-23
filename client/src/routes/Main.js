import { Box, Container } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import React, { useState } from "react";

const Main = () => {
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
        <div className="input-container">
          <div className="pw-output-container">
            <input
              readOnly
              type="text"
              placeholder="Minimum 8 Characters"
              className="pw-output"
            />
            <ContentCopyIcon sx={{ margin: 0.5 }} />
          </div>
          <div className="checkbox-div">
            <div className="checkbox-label-div">
              <label htmlFor="pw-name">Used for:</label>
              <input type="text" className="pw-name-input" />
            </div>
            <div className="checkbox-label-div">
              <label htmlFor="Length">Length:</label>
              <input
                type="number"
                placeholder="8+"
                min="8"
                max="20"
                name="length"
                id="length"
                required={true}
              />
            </div>

            <div className="checkbox-label-div">
              <label htmlFor="Upper Case"> Upper Case:</label>
              <input type="checkbox" />
            </div>

            <div className="checkbox-label-div">
              <label htmlFor="Lower Case"> Lower Case:</label>
              <input type="checkbox" />
            </div>

            <div className="checkbox-label-div">
              <label htmlFor="Number"> Number:</label>
              <input type="checkbox" />
            </div>

            <div className="checkbox-label-div">
              <label htmlFor="Symbol"> Symbol:</label>
              <input type="checkbox" />
            </div>
          </div>
          <div className="button-div">
            <Button variant="contained" className="form-button">
              Generate
            </Button>
            <Button variant="contained" className="form-button">
              Save
            </Button>
          </div>
        </div>
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