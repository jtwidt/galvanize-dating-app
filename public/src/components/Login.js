import React from "react";
import { useState } from "react";
import md5 from "js-md5";
import { useHistory } from "react-router-dom";

function Login({ onUserLogin }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useHistory();

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    fetch(`http://localhost:3010/api/v1/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, password: md5(user.password) }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.data.loginSuccess === true) {
          onUserLogin({ success: true, userId: json.data.userId });
          // console.log(json.data.userId);
          // setUserId(json.data.userId);
          history.push("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ui centered grid">
      <div className="eight wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">
            <i className="lock icon"></i>Login
          </h1>
          <form className="ui form" onSubmit={onFormSubmit}>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              ></input>{" "}
            </div>{" "}
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></input>{" "}
            </div>{" "}
            <button className="ui primary button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
