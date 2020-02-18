import React, { Component } from 'react'
import NewTodo from './NewTodo'


export default class SingleArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            area: {
                id: props.id,
                backgroundColor: props.color,
                className: props.className,
                areaName: props.name,
                taskcount: props.taskcount,
                btnValue: props.btnValue,
                tasks: props.tasks,
            },
            newTodoVisible: false
        }
    }

    toggleNewTodo = () => {
        const isActive = this.state.newTodoVisible;
        this.setState({newTodoVisible: !isActive});
    }

    render() {
        return (
            <div id={this.state.area.id} style={{ backgroundColor: this.state.area.backgroundColor }}
                className={this.state.area.className}>
                <h2>{this.state.area.areaName}</h2>
                <p className='areaSummary'>Tasks: {this.state.area.taskcount}</p>
                <button value={this.state.area.btnValue} onClick={this.toggleNewTodo}>Add ToDo</button>
                {this.state.newTodoVisible ? <NewTodo/> : null}
                <div className='todoItemContainer'>
                    {this.state.area.tasks.length > 0 ? this.state.area.tasks : "No Tasks!"}
               </div>
            </div>
        )
    }
}

