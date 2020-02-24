import React, { Component } from 'react'
import apis from '../api'
import { check } from 'express-validator'

export default class GenerateList extends Component {
    constructor() {
        super()

        this.state = {
            areas: [],
            todoList: [],
            activeAreas: []
        }
    }


    // Loading Areas
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await apis.getAreasWithoutEmpty().then(response => {
            console.log(response.data)
            let tempActive = [];
            response.data.forEach(element => {
                tempActive.push({ 
                    id: element._id, 
                    state: true, 
                    areaTitle: element.areaTitle, 
                    color: element.color,
                    todoCount: element.todoCount})
            });
            this.setState({
                areas: response.data,
                isLoading: false,
                activeAreas: tempActive 
            })
        })
    }

    createTempList = () => {
        let tempList = []
        this.state.areas.map((area, index) => {
            console.log(area.todos)
            area.todos.forEach(todo => {
                tempList.push(todo.todoName)
            });
        })
        console.log(tempList)
        this.setState({ todoList: tempList })
    }

    //change Selected Areas
    changeActiveAreas = (e) => {
        let tempActive = this.state.activeAreas;
        var foundIndex = tempActive.findIndex(x => x.id == e.target.id);
        tempActive[foundIndex].state = !tempActive[foundIndex].state;
        this.setState({activeAreas: tempActive})
    }

    render() {
        let allAreas = null;
        if (this.state.activeAreas.length > 0) {
            allAreas = this.state.activeAreas.map((area, index) => {
                return (
                    <p key={area.id}><label className="selectArea"
                        style={{ backgroundColor: area.color }}>
                        <input type="checkbox" onChange={this.changeActiveAreas} 
                        checked={area.state} id={area.id} />
                        {area.areaTitle} Todos: {area.todoCount}
                    </label></p>
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
                    <div><input type="number" defaultValue="60" /></div>
                    <div><input type="number" defaultValue="10" /></div>
                </div>
                {allAreas}
                <button onClick={this.createTempList}>Create</button>
                <button>Cancel</button>
                <div>
                    {this.state.todoList}
                </div>

                {/* TODO */}
                <p>Priority</p>
                <p>Check/Uncheck Areas</p>
            </div>
        )
    }
}
