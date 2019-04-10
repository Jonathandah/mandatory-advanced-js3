import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Redirect } from "react-router-dom";
import {token$, updateToken, clearToken} from "./store";
import jwt from "jsonwebtoken";
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      logout: false,
    }
    this.onLogout = this.onLogout.bind(this);
  }
  
  componentDidMount(){
    console.log(token$);
    if(token$.value !== null){
      const decode = jwt.decode(token$.value);
      console.log(decode);
      this.setState({
        email: "signed in as" + decode.email
      })
    }
  }
  
  onLogout(){
    clearToken();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <p>{this.state.email}</p>
            <button onClick={this.onLogout}>signout</button>
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
