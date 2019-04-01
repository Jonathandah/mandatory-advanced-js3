import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

class Login extends Component {
  render() {
    return (
        <div className="Login">
            <div className="Login__container">
                <div className="Login__container__box">
                </div>
            </div>
        </div>
    );
  }
}
