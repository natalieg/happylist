import React, { Component } from 'react'
import NewTodo from './NewTodo'
import SingleTodoInArea from './SingleTodoInArea'
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
            tasks: [],
            taskcount: props.taskcount,
            newTodoVisible: false,
            newTodoCss: "test2_2",
            isLoading: false,
            updateAreas: props.updateAreas
        }
    }


    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await apis.getAreaTodos({ areaId: this.state.area.areaId }).then(response => {
            this.setState({
                tasks: response.data,
                isLoading: false,
                init: false
            })
        })
    }

    handleLoadData = async () => {
        await apis.getAreaTodos({ areaId: this.state.area.areaId }).then(response => {
            // this.setState({ tasks: [] })
            this.setState({
                tasks: response.data,
                isLoading: false
            })
        })
    }

    checkTodos = () => {
        if (this.props.taskcount != this.state.tasks.length) {
            this.handleLoadData()
        }
    }

    toggleNewTodo = () => {
        const isActive = this.state.newTodoVisible;
        this.setState({ newTodoVisible: !isActive });
    }

    render() {
        this.checkTodos()
        let displayTodos = this.state.tasks.map((todo, index) => {
            return <SingleTodoInArea
                key={todo._id}
                todo={todo}
                reloadData={this.handleLoadData} />
        })

        return (
            <div id={this.state.area.areaId}
                key={this.state.area.areaId}
                style={{ backgroundColor: this.state.area.backgroundColor }}
                className={this.state.area.className}>
                <div className="singleAreaUpper">
                    <h2>{this.state.area.areaName}</h2>
                    {/* FIXME props taskcount works but not state taskcount ??? */}
                    <p className='areaSummary'>Tasks: {this.props.taskcount}</p>
                    <button value={this.state.area.btnValue} onClick={this.toggleNewTodo}>Add ToDo</button>
                </div>
                <div className="newTodoArea">
                    {this.state.newTodoVisible ?
                        <NewTodo divClass={this.state.newTodoCss}
                            areaId={this.state.area.areaId}
                            reloadTodo={this.handleLoadData}
                            updateAreas={this.state.updateAreas}
                        />
                        : null}
                </div>
                <div className='todoItemContainer'>
                    {this.state.tasks.length > 0 ?
                        <>{displayTodos}</>
                        : "No Tasks!"}
                </div>
            </div>

        )
    }
}

