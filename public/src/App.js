import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="ui secondary  menu">
          <div className="item">
            <Link to="/signup">Home</Link>
          </div>
          <div className="right menu">
            {/* <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div> */}
            <a className="item">
              <Link to="/profile">Profile</Link>
            </a>
            <a className="ui item">
              <Link to="/login">Login</Link>
            </a>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
