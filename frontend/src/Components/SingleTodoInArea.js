import React, { Component } from 'react'
import EditTodo from './EditTodo'

export default class SingleTodoInArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todo: props.todo,
            todoName: props.todo.todoName,
            finished: props.todo.finished,
            finishedParts: props.todo.finishedParts,
            allParts: props.todo.allParts,
            hoverActive: false,
            editActive: false
        }
    }

    calcProgress = () => {
        if (this.state.finishedParts === 0) {
            return 0
        } else {
            let calc = (this.state.finishedParts / this.state.allParts) * 100;
            calc = parseInt(calc)
            return calc
        }
    }

    handleMouseOver = () => {
        this.setState({ hoverActive: true })
    }

    handleMouseOut = () => {
        this.setState({ hoverActive: false })
    }

    handleEditMode = () => {
        let tempState = this.state.editActive;
        this.setState({ editActive: !tempState })
    }

    render() {
        return (
            <p className={`singleTodoArea ${(this.state.finished && !this.state.editActive) ? "todoComplete" : "todoIncomplete"}`}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                key={this.state.todo._id}>
                {!this.state.editActive &&
                    this.state.todoName
                }
                {(this.state.editActive || this.state.hoverActive) &&
                    <i className="far fa-edit icon"
                        onClick={this.handleEditMode} />
                }
                <span className="todoProgress">{this.calcProgress()}%</span>

                {this.state.editActive &&
                    <EditTodo todoName={this.state.todoName}/>
                }
            </p>
        )
    }
}
