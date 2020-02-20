import React, { Component } from 'react'

export default class GenerateList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areas: props.areas,
            todoList: []
        }
    }

    createTempList = () => {
        let tempList= []
        this.state.areas.map((area,index) => {
            console.log(area.todos)
            area.todos.forEach(todo => {
                tempList.push(todo.todoName)
            });
        })
        console.log(tempList)
        this.setState({todoList: tempList})
    }

    render() {
        let allAreas = this.state.areas.map((area, index) => {
            return (
                <p key={index}><label className="selectArea"
                    style={{ backgroundColor: area.color }}>
                    <input type="checkbox" checked={area.selected} />
                    {area.areaTitle}
                </label></p>
            )
        })

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
                {this.state.todoList}
                {/* TODO */}
                <p>Priority</p>
                <p>Check/Uncheck Areas</p>
            </div>
        )
    }
}
