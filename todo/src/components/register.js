import React, { Component } from 'react';
import { Route, Link, Redirect } from "react-router-dom"; 
import '../App.css';
import Form from "./form";
import axios from "axios";


class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      email: "",
      password: "",
      register: false,
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
      console.log(this.state.email);
    }else{
      this.setState({
        password: e.target.value
      })
      console.log(this.state.password);
    }
  }

  onSubmit(e){
    e.preventDefault();
    const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
    const email = this.state.email;
    const password = this.state.password;
    axios.post(API_ROOT + "/register", {email, password}, {cancelToken: this.source.token})
    .then((response)=>{
        console.log(response);
        this.setState({
            register: true,
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
      if(this.state.register){
        return <Redirect to="/login"></Redirect>
      }else if(this.state.error){
        return(
          <div className="--containerCenter">
            <p>Something went wrong...</p>
          </div>
        ) 
      }

    return (
        <div className="Register --containerCenter">
            <div className="Register__container --containerCenter --column">
                <h2>Register</h2>
                <div className="Register__container__box --containerCenter --column">
                  <Form state={this.state} change={this.onChange} submit={this.onSubmit}></Form>
                </div>
            </div>
        </div>
    );
  }
}
export default Register;
