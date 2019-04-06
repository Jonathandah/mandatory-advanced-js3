import React from 'react';

const List = (props) =>{
    function createLi(item){
        return <li key={item.id}>{item.content} <button value={item.id} onClick={props.onDelete}>X</button></li>
    }

    return(
        <ul>
          {props.todos.map(item => createLi(item))}
        </ul>
    )
}

export default List;