import React from 'react';

const List = (props) =>{
    function createLi(item){
        
        return <li >{item}</li>
    }

    return(
        <ul>
          {/*props.list.map(item => createLi(item))*/}
        </ul>
    )
}

export default List;