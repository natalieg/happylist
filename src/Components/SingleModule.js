import React from 'react'

export default function SingleModule(props) {
    return (
        <div id={props.id} style={{backgroundColor: props.color}} className={props.className}>
            <h2>{props.name}</h2>
            <p>Tasks: {props.taskcount}</p>
            <button value={props.btnValue} onClick={props.click}>Add ToDo</button>
            <div className='todoItemContainer'>{props.tasks}</div>
        </div>
    )
}
