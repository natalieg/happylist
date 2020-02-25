import React, { Component } from 'react'

export default class SingleTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.todoId,
            todoName: props.todoName,
            color: props.color,
            
        }
    }

    render() {
        return (
            <div key={this.state.id} className="singleTodo">
                <label>
                    <input type="checkbox" />
                    {this.state.todoName}
                </label>
                <div className="todoColorRef"
                    style={{ backgroundColor: this.state.color }}></div>
            </div>
        )
    }
}
