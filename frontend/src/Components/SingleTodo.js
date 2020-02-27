import React, { Component } from 'react'

export default class SingleTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.todoId,
            todoName: props.todoName,
            color: props.color,
            state: props.state,
            partNumber: props.partNumber,
            allParts: props.allParts,
            todoClassName: ''
        }
    }

    changeTodoState = (e) => {
        const value = e.target.checked;
        this.setState({ state: value })
        if (value) {
            this.setState({ todoClassName: "todoComplete" })
        } else {
            this.setState({ todoClassName: "todoIncomplete" })
        }
    }

    render() {
        return (
            <div key={this.state.id} className="singleTodo">
                <label className={this.state.todoClassName}>
                    <input type="checkbox"
                        value={this.state.state}
                        onChange={this.changeTodoState} />
                    {this.state.todoName}
                    <span className="partDisplay">{this.state.partNumber}/{this.state.allParts}
                    </span>
                </label>
                <div className="todoColorRef"
                    style={{ backgroundColor: this.state.color }}></div>
            </div>
        )
    }
}
