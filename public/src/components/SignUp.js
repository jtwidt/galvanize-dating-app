import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import md5 from "js-md5";

const init = {
  first_name: "",
  last_name: "",
  email: "",
  display_name: "",
  password1: "",
  password2: "",
};
// #TODO Implement duplicate email/account error handling
// #TODO Implement password mismatch/empty field error handling
function SignUp() {
  const [user, setUser] = useState(init);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (user.password1 !== user.password2) {
      console.log("Password's do not match!");
      return;
    }
    fetch(`http://localhost:3010/api/v1/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, password: md5(user.password1) }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if ((json = "Account created")) {
          setCreated(true);
          setDisabled(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ui centered grid">
      <div className="eight wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">
            <i className="user plus icon"></i>Sign Up
          </h1>
          <form
            className={`ui ${created ? "success" : ""} form`}
            onSubmit={(event) => onFormSubmit(event)}
          >
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    first_name: e.target.value,
                    display_name: `${e.target.value} ${user.last_name}`,
                  })
                }
              ></input>
            </div>{" "}
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>Last Name</label>
              <input
                type="text"
                value={user.last_name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    last_name: e.target.value,
                    display_name: `${user.first_name} ${e.target.value}`,
                  })
                }
              ></input>{" "}
            </div>{" "}
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>Display Name</label>
              <input
                type="text"
                value={user.display_name}
                onChange={(e) =>
                  setUser({ ...user, display_name: e.target.value })
                }
              ></input>{" "}
            </div>{" "}
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>Email</label>
              <input
                type="text"
                value={user.email}
                autoComplete="email username"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              ></input>{" "}
            </div>{" "}
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>Password</label>
              <input
                type="password"
                value={user.password1}
                autoComplete="new-password"
                onChange={(e) =>
                  setUser({ ...user, password1: e.target.value })
                }
              ></input>{" "}
            </div>{" "}
            <div className={`${disabled ? "disabled" : ""} field`}>
              <label>Verify Password</label>
              <input
                type="password"
                value={user.password2}
                autoComplete="new-password"
                onChange={(e) =>
                  setUser({ ...user, password2: e.target.value })
                }
              ></input>{" "}
            </div>
            <div className={`ui ${loading ? "" : "hidden"} icon message`}>
              <i className="notched circle loading icon"></i>
              <div className="content">
                <div className="header">Just one second</div>
                <p>We're creating that account for you.</p>
              </div>
            </div>
            <div className={`ui success message`}>
              {/* <i className="close icon"></i> */}
              <div className="header">
                Your user registration was successful.
              </div>
              <button
                className="ui right floated compact primary button"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
              <p>You may now log-in with the username you have chosen</p>
            </div>
            <button
              className={`ui ${
                disabled ? "disabled" : ""
              } right floated primary button`}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
