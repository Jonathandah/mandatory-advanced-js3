import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';
import axios from "axios";

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            token: window.localStorage.token,
            error: false,
            value: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    /*
    componentDidMount(){
        const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.get(API_ROOT + "/todos", this.state.token)
        .then((response) => {
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                error: true
            })
        });
    }
    */
   
    onChange(e){
        this.setState({
            value: e.target.value,
        })
    }

    onClick(e){
        const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        let obj ={
            content: this.state.value
        }
        axios.post(API_ROOT + "/todos", obj, this.state.token)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  render() {
      console.log(this.state.login);
      if(this.state.token.length === 0){
        return <Redirect to="/login"></Redirect>
      }

    return (
        <div className="Home">
            <div className="Home__container">
                <div className="Home__container__box">
                    <p>Todo</p>
                    <input type="text" onChange={this.onChange} value={this.state.value}></input>
                    <button onClick={this.onClick}>Add</button>
                </div>
                <div className="Home__container__box">

                </div>
            </div>
        </div>
    );
  }
}
export default Main;
