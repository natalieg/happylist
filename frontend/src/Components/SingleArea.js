import React, { Component } from 'react'
import NewTodo from './NewTodo'
import apis from '../api'

export default class SingleArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            area: {
                areaId: props.id,
                backgroundColor: props.color,
                className: props.className,
                areaName: props.name,
                btnValue: props.btnValue
            },
            tasks: props.tasks,
            taskcount: props.taskcount,
            newTodoVisible: false,
            newTodoCss: "test2_2",
            isLoading: true
        }
    }
    
    handleLoadData = async () => {
        await apis.getAreaTodos({areaId:this.state.area.areaId}).then(response => {
            let displayTodos = response.data.map((todo, ind) => {
            return <p key={ind}>{todo.todoName}</p>
            })
            this.setState({
                tasks: displayTodos,
                isLoading: false
            })
        })
    }

    toggleNewTodo = () => {
        const isActive = this.state.newTodoVisible;
        this.setState({newTodoVisible: !isActive });
    }

    render() {
        return (

            <div id={this.state.area.areaId} style={{ backgroundColor: this.state.area.backgroundColor }}
                className={this.state.area.className}>
                <h2>{this.state.area.areaName}</h2>
                <p className='areaSummary'>Tasks: {this.state.taskcount}</p>
                <button value={this.state.area.btnValue} onClick={this.toggleNewTodo}>Add ToDo</button>
          
                    {this.state.newTodoVisible ? 
                    <NewTodo divClass={this.state.newTodoCss} 
                    areaId={this.state.area.areaId} 
                    reloadTodo={this.handleLoadData}/> 
                    : null}
   
                <div className='todoItemContainer'>
                    {this.state.tasks.length > 0 ? this.state.tasks : "No Tasks!"}
                </div>
            </div>

        )
    }
}

