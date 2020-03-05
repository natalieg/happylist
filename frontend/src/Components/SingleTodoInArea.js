import React, { Component } from 'react'
import EditTodo from './EditTodo'
import apis from '../api'

export default class SingleTodoInArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todo: props.todo,
            todoId: props.todo._id,
            hoverActive: false,
            editActive: false
        }
    }


    handleLoadData = async () => {
        await apis.getSingleTodo({ todoId: this.state.todoId }).then(response => {
            console.log("HIIIIIIIIIIIIIIIIII")
            console.log(response.data)
            this.setState({
                todo: response.data
            })
        })
    }

    calcProgress = () => {
        if (this.state.todo.finishedParts === 0) {
            return 0
        } else {
            let calc = (this.state.todo.finishedParts / this.state.todo.allParts) * 100;
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
            <p className={`singleTodoArea ${(this.state.todo.finished && !this.state.editActive) ? "todoComplete" : "todoIncomplete"}`}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                key={this.state.todo._id}>
                {!this.state.editActive &&
                    this.state.todo.todoName
                }
                {(this.state.editActive || this.state.hoverActive) &&
                    <i className="far fa-edit icon"
                        onClick={this.handleEditMode} />
                }
                <span className="todoProgress">{this.calcProgress()}%</span>

                {this.state.editActive &&
                    <EditTodo
                        key={this.state.todoId}
                        todoId={this.state.todoId}
                        todoName={this.state.todo.todoName}
                        finishedParts={this.state.todo.finishedParts}
                        allParts={this.state.todo.allParts}
                        partName={this.state.todo.partName}
                        partTime={this.state.todo.partTime}
                        totalTime={this.state.todo.totalTime}
                        hideEdit={this.handleEditMode}
                        reloadTodo={this.handleLoadData}
                    />
                }
            </p>
        )
    }
}
