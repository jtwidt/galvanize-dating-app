import React from "react";
import { useState, useEffect } from "react";
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

function App() {
  const [userId, setuserId] = useState(34);

  useEffect(() => {
    // return () => {
    //   cleanup
    // }
  }, [userId]);

  return (
    <Router>
      <div className="App">
        <div className="ui pointing menu">
          <NavLink to="/signup" className="item" activeClassName="active">
            Home
          </NavLink>
          <div className="right menu">
            {/* <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div> */}
            {/* <div className="item"> */}
            <NavLink to="/profile" className="item" activeClassName="active">
              Profile
            </NavLink>
            {/* </div> */}
            <NavLink to="/login" className="item" activeClassName="active">
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          <Profile userId={userId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
