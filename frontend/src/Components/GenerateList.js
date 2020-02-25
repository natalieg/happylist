import React, { Component } from 'react'
import apis from '../api'
import { check } from 'express-validator'

export default class GenerateList extends Component {
    constructor() {
        super()

        this.state = {
            userTime: 60,
            userMaxTasks: 10,
            areas: [],
            activeAreas: [],
            todoList: [],
            currentTodoListCount: 0
        }
    }


    // Loading Areas
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await apis.getAreasWithoutEmpty().then(response => {
            let tempActive = [];
            response.data.forEach(element => {
                tempActive.push({
                    id: element._id,
                    state: true,
                    areaTitle: element.areaTitle,
                    color: element.color,
                    todoCount: element.todoCount
                })
            });
            this.setState({
                areas: response.data,
                isLoading: false,
                activeAreas: tempActive
            })
        })
    }

    createTodoList = async () => {
        this.setState({ isLoading: true })
        let areaIds = []
        this.state.activeAreas.forEach(area => {
            if (area.state) {
                areaIds.push(area.id)
            }
        });
        await apis.generateList({
            areaIds: areaIds,
            maxNumber: this.state.userMaxTasks
        })
            .then(response => {
                let tempTodo = [];
                response.data.forEach(todo => {
                    tempTodo.push({
                        todoName: todo.todoName,
                        color: todo.areaColor
                    })
                })
                this.setState({
                    todoList: tempTodo,
                    currentTodoListCount: tempTodo.length
                })
            })
    }

    //change Selected Areas
    changeActiveAreas = (e) => {
        let tempActive = this.state.activeAreas;
        var foundIndex = tempActive.findIndex(x => x.id == e.target.id);
        tempActive[foundIndex].state = !tempActive[foundIndex].state;
        this.setState({ activeAreas: tempActive })
    }

    handleInputTask = (e) => {
        const value = e.target.value;
        this.setState({ userMaxTasks: value })
    }

    handleInputTime = (e) => {
        const value = e.target.value;
        this.setState({ userTime: value })
    }

    render() {
        let allAreas = null;
        if (this.state.activeAreas.length > 0) {
            allAreas = this.state.activeAreas.map((area, index) => {
                return (
                    <div key={area.id} className="selectArea"
                        style={{ backgroundColor: area.color }}>
                        <label>
                            <input type="checkbox" onChange={this.changeActiveAreas}
                                checked={area.state} id={area.id} />
                            {area.areaTitle} : {area.todoCount}
                        </label></div>
                )
            })
        }
        let generatedList = null;
        if (this.state.todoList.length > 0) {
            generatedList = this.state.todoList.map((todo, index) => {
                return (
                    <div key={index} className="singleTodo">
                        {todo.todoName}
                        <div className="todoColorRef"
                            style={{ backgroundColor: todo.color }}></div>
                    </div>
                )
            })
        }

        return (
            <div className="list">
                <h1>Generate your List!</h1>
                <div className="row">
                    <div><label>Time</label></div>
                    <div><label>Tasks</label></div>
                </div>
                <div className="row">
                    <div><input type="number" onChange={this.handleInputTime} value={this.state.userTime} /></div>
                    <div><input type="number" onChange={this.handleInputTask} value={this.state.userMaxTasks} /></div>
                </div>
                <div className="selectAreasDiv">
                    {allAreas}
                </div>
                <button onClick={this.createTodoList}>Create</button>
                <button>Cancel</button>
                <div>
                    {this.state.currentTodoListCount > 0 ?
                        <div className="visibleListWrapper">
                            <div>Current Todos: {this.state.currentTodoListCount}</div>
                            {generatedList}
                        </div>
                        : null}
                </div>

                {/* TODO */}
                {/* <p>Priority</p> */}
            </div>
        )
    }
}
