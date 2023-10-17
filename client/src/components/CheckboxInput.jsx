import React from "react";

const CheckboxInput = (props) => {
  return (
    <div className="label-div">
      <label htmlFor="symbol"> Symbol:</label>
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        checked={props.checked}
        onChange={props.setValues}
      />
    </div>
  );
};

export default CheckboxInput;
