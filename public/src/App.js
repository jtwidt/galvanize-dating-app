import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Login />
      <hr />
      <SignUp />
      <hr />
      <Profile />
    </div>
  );
}

export default App;
