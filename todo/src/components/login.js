import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Redirect } from "react-router-dom";
import {token$, updateToken} from "../store";
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
      error: false,
    }
    this.CancleToken = axios.CancelToken;
    this.source = this.CancleToken.source();

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
      updateToken(response.data.token);

      this.setState({
        login: true,
      })
    })
    .catch((error)=>{
      console.log(error);
      this.setState({
        error: true,
      })
    })
  }


  componentWillUnmount(){
    this.source.cancel("Request cancel");
  }

  render() {
    if(this.state.login){
      return <Redirect to="/"></Redirect>
    }else if(this.state.error){
      return(
        <div className="--containerCenter">
          <p>Something went wrong...</p>
        </div>
      ) 
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
