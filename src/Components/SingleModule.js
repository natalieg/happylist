import React from 'react'

export default function SingleModule(props) {
    return (
        <div style={{backgroundColor: props.color}} className='singleModule'>
            <h2>{props.name}</h2>
            <p>Tasks: {props.taskcount}</p>
            <button value={props.btnValue} onClick={props.click}>Add ToDo</button>
            <div>{props.tasks}</div>
        </div>
    )
}
