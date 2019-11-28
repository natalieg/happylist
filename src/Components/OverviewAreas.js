import React from 'react'

export default function OverviewAreas(props) {
    return (
        <div>
            <h1>This is an Overview</h1>
            <p>You have {props.areaCount} Areas and {props.allTodoCount} ToDos</p>
        </div>
    )
}
