import React from "react";
import { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, zodiac, onZodiacChange, inputLabel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

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
  const onBodyClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
  }, []);

  return (
    <div ref={ref} className="field">
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
