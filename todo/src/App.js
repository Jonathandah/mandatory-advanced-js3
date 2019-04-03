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
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route  path="/register" component={Register}></Route>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
