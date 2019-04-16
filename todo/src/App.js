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
      logout: false,
      token: token$.value,
    }
    this.onLogout = this.onLogout.bind(this);
  }
  
  componentDidMount(){
    console.log(token$.value);
    if(token$.value !== "null" && token$.value !== null ){
      const decode = jwt.decode(token$.value);
      console.log(decode);
      this.subscription = token$.subscribe((token) => {
        this.setState({ token });
      });
    }
  }
  
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  
  onLogout(){
    this.setState({
      email: "",
    })
    clearToken();
  }

  render() {
    const { token } = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <Link to="/" className="App__header__link">Home</Link>
            <Link to="/login" className="App__header__link">Login</Link>
            <Link to="/register" className="App__header__link">Register</Link>
            <p>{token ? jwt.decode(token).email : null }</p>
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
