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
      token: token$.value,
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
      this.subscription = token$.subscribe((token) => {
        this.setState({ token });
      });
    }
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  
  onLogout(){
    clearToken();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <Link to="/" className="App__header__link">Home</Link>
            <Link to="/login" className="App__header__link">Login</Link>
            <Link to="/register" className="App__header__link">Register</Link>
            <p>{this.state.email}</p>
            {/*token$.value === null ? <button onClick={this.onLogout}>signout</button> : null            funkar inte???*/} 
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
