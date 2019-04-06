import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {token$, updateToken} from "../store";
import '../App.css';
import axios from "axios";
import jwt from "jsonwebtoken";
import List from "./list";

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            token: token$.value,
            postError: false,
            getError: false,
            value: "",
            todos: [{content: "test", id: "afasfafdafsa"}],
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
  
    getApi(){
      if(this.state.token){
        const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.get(API_ROOT + "/todos", {
          headers: {
            Authorization: "Bearer " + this.state.token,
          }
        })
        .then((response) => {
            console.log(response.data.todos);
            this.setState({
              todos: response.data.todos,
            })
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                getError: true
            })
        });
      }
    }

    componentDidMount(){
      this.getApi();
    }
    
    
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
        
        axios.post(API_ROOT + "/todos", obj, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          }
        })
        .then((response)=>{
            this.setState({
              todos: [...this.state.todos, response.data.todo]
            })
        })
        .catch((error)=>{
            console.log(error)
            this.setState({
                postError: true,
            })
        })
    }

    onDelete(e){
      let id = e.target.value;
      const API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
      axios.delete(API_ROOT + "/todos/" + id, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        }
      })
      .then(response => {
        let newTodo = [...this.state.todos];
        this.setState({
          todos: newTodo.filter(item => id !== item.id),
        })
      })
    }

  render() {
      if(this.state.token === undefined){
        return <Redirect to="/login"></Redirect>
      }else if(this.state.postError){
        return(
          <div className="--containerCenter">
            <p>couldn`t add item...</p>
          </div>
        ) 
      }else if(this.state.getError){
        return(
          <div className="--containerCenter">
            <p>Something went wrong...</p>
          </div>
        ) 
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
                  <List todos={this.state.todos} onDelete={this.onDelete}></List>
                </div>
            </div>
        </div>
    );
  }
}
export default Main;
