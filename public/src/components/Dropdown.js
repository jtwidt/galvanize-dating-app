import React from "react";
import { useState } from "react";

const Dropdown = ({ options, zodiac, onZodiacChange }) => {
  const [open, setOpen] = useState(false);
  //  #FIXME Doesn't close when clicking in the body - See udemy video
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onZodiacChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="field">
      <label className="label">Select your zodiac sign</label>
      <div
        className={`ui selection dropdown ${open ? "visible active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <i className="dropdown icon"></i>
        <div className="text">{zodiac.label}</div>
        <div className={`menu ${open ? "visible transition" : ""}`}>
          {renderedOptions}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
