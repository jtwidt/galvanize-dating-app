import React from "react";
import { useState } from "react";

function Login() {
  const [user, setLogin] = useState({});

  return (
    <div className="ui centered grid">
      <div className="eight wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">
            <i className="lock icon"></i>Login
          </h1>
          <form className="ui form">
            <div className="field">
              <label>Email</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Password</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <button className="ui primary button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
