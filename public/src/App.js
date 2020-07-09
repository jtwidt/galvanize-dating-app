import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";

let init = { success: false, userId: 36 };

function App() {
  const [loggedIn, setLoggedIn] = useState(init);

  const loginButton = () => {
    const logOut = () => {
      setLoggedIn(false);
    };

    if (loggedIn.success) {
      return (
        <React.Fragment>
          <NavLink to="/profile" className="item" activeClassName="active">
            Profile
          </NavLink>
          <NavLink
            to="/login"
            className="item"
            activeClassName="active"
            onClick={logOut}
          >
            LogOut
          </NavLink>
        </React.Fragment>
      );
    } else {
      return (
        <NavLink to="/login" className="item" activeClassName="active">
          Login
        </NavLink>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="ui pointing menu">
          <NavLink to="/signup" className="item" activeClassName="active">
            Home
          </NavLink>
          <div className="right menu">
            {/* <NavLink to="/login" className="item" activeClassName="active">
              {`${loggedIn.success ? "LogOut" : "Login"}`}
            </NavLink> */}
            {loginButton()}
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/login">
          <Login onUserLogin={setLoggedIn} />
        </Route>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          {loggedIn.success ? (
            <Profile userId={loggedIn.userId} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
