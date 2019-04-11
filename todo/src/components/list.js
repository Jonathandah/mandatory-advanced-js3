import React from 'react';

const List = (props) =>{
    console.log(props.todos)
    function createLi(item){
        console.log(item);
        return <li key={item.id}>{item.content} <button value={item.id} onClick={props.onDelete}>X</button></li>
    }
    if(props.todos !== null){
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