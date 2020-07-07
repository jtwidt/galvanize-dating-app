import React from "react";
import { useState } from "react";

function SignUp() {
  const [user, setUser] = useState({});

  return (
    <div className="ui centered grid">
      <div className="eight wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">
            <i className="user plus icon"></i>Sign Up
          </h1>
          <form className="ui form">
            <div className="field">
              <label>First Name</label>
              <input type="text" name="first_name" value="First Name"></input>
            </div>{" "}
            <div className="field">
              <label>Last Name</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Display Name</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Email</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Password</label>
              <input type="text"></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Verify Password</label>
              <input type="text"></input>{" "}
            </div>
            <button class="ui right floated primary button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
