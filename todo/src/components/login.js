import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Redirect } from "react-router-dom";
import '../App.css';
import Form from "./form"
import axios from "axios";


class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email: "",
      password: "",
      login: false,
      token: "",
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    if(e.target.id === "email"){
      this.setState({
        email: e.target.value,  
      })
    }else{
      this.setState({
        password: e.target.value
      })
    }
  }

  onSubmit(e){
    e.preventDefault();
    const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
    const email = this.state.email;
    const password = this.state.password;
    axios.post(API_ROOT + "/auth", {email, password})
    .then((response)=>{
      console.log(response);
      this.setState({
        login: true,
      })

      window.localStorage.setItem("token", response.data.token);
    })
  }

  render() {
    if(this.state.login){
      return <Redirect to="/"></Redirect>
    }
    return (
        <div className="Login --containerCenter --column">
            <div className="Login__container --containerCenter --column">
                <h2>Login</h2>
                <div className="Login__container__box --containerCenter --column">
                  <Form state={this.state} change={this.onChange} submit={this.onSubmit}></Form>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
