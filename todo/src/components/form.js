import React from 'react';

const Form = (props) =>{
    return(
        <form onSubmit={props.submit}>
            <p>Email:</p>
            <input type="email" onChange={props.change} value={props.state.email} id="email" required></input>
            <p>Password:</p>
            <input type="password" onChange={props.change} value={props.state.password} id="password" required></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;