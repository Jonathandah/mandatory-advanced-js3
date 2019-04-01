import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </header>
          <main>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/login" Component={Login}></Route>
            <Route exact path="/register" Component={Register}></Route>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
