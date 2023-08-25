import React from "react";

const Form = () => {
  return (
    <div className="form-wrapper">
      <form>
        <input readOnly type="text" placeholder="minimum 8 characters" />
        <label>
          Length:
          <input type="number" min={10} max={25} placeholder="10" />
        </label>

        <label>
          Upper Case:
          <input type="checkbox" />
        </label>

        <label>
          Lower Case:
          <input type="checkbox" />
        </label>

        <label>
          Symbol:
          <input type="checkbox" />
        </label>

        <label>
          Number:
          <input type="checkbox" />
        </label>
      </form>
    </div>
  );
};

export default Form;
