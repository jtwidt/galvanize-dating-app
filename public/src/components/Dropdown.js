import React from "react";
import { useState, useEffect } from "react";

const Dropdown = ({ options, zodiac, onZodiacChange, inputLabel }) => {
  const [open, setOpen] = useState(false);
  //  #FIXME Doesn't close when clicking in the body - See udemy video
  const renderedOptions = options
    .filter((option) => option.value !== zodiac.value)
    .map((option) => {
      return (
        <div
          key={option.value}
          className="item"
          onClick={() => {
            onZodiacChange(option);
          }}
        >
          {option.label}
        </div>
      );
    });

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpen(false);
    });
  }, []);

  return (
    <div className="field">
      <label className="label">{inputLabel}</label>
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
