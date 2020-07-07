import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <SignUp />
      <hr></hr>
      <Profile />
    </div>
  );
}

export default App;
