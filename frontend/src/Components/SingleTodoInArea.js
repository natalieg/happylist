import React, { Component } from 'react'

export default class SingleTodoInArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todo: props.todo,
            todoName: props.todo.todoName,
            finished: props.todo.finished,
            finishedParts: props.todo.finishedParts,
            allParts: props.todo.allParts
        }
    }

    

    calcProgress = () => {
        if(this.state.finishedParts === 0){
            return 0
        } else {
            let calc = (this.state.finishedParts / this.state.allParts) * 100;
            calc = parseInt(calc) 
            return calc
        }
    }

    render() {
        console.log("TODO", this.state.todo)
        return (
            <p className={`singleTodoArea ${this.state.finished ? "todoComplete" : "todoIncomplete"}`}
            
            key={this.state.todo._id}>
                {this.state.todoName}
                <span className="todoProgress">{this.calcProgress()}%</span>
            </p>
        )
    }
}
