import React from 'react';

const List = (props) =>{
    console.log(props.todo)
    function createLi(item){
        return <li key={item.id}>{item.content} <button value={item.id} onClick={props.onDelete}>X</button></li>
    }
    if(props.todo !== undefined){
        return(
            <ul>
                {props.todos.map(item => createLi(item))}
            </ul>
        )
    }else{
        return <></>
    }
}

export default List;