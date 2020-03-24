import React, { Component } from 'react'
import apis from '../api';

export default class EditTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoId: props.todoId,
            
            todoName: props.todoName,
            finishedParts: props.finishedParts,
            partName: props.partName,
            allParts: props.allParts,
            partTime: props.partTime,
            totalTime: props.totalTime,
            hideEdit: props.hideEdit,
            reloadTodo: props.reloadTodo,
            reloadData: props.reloadData,
            updateArea: props.updateArea
        }
    }

    handleSendData = async () => {
        const data = this.state;
        await apis.editTodo(data).then(response => {

        }).catch(err => {
            console.log(err)
        })
        this.state.hideEdit()
        this.state.reloadTodo()
    }

    onSubmit = () => {
        this.handleSendData()
    }

    deleteTask = async () => {
        const data = this.state;
        const config = {
            data: data
        }
        await apis.deleteTodo(config).then(response => {

        }).catch(err => {
            console.log(err)
        })
        this.state.hideEdit()
        this.state.reloadData()
        this.state.updateArea()
    }

    checKey = (e) => {
        if (e.key === "Enter") {
            this.onSubmit()
        }
    }

    handleInputName = (e) => {
        const value = e.target.value;
        this.setState({ todoName: value })
    }

    handleInputPartName = (e) => {
        const value = e.target.value;
        this.setState({ partName: value })
    }

    handleFinishedParts = (e) => {
        const value = e.target.value;
        this.setState({ finishedParts: value })
    }

    handleInputAllParts = (e) => {
        const value = parseInt(e.target.value);
        const timeCalc = value * this.state.partTime;
        this.setState({ totalTime: timeCalc })
        this.setState({ allParts: value })
    }

    // Single Time input calculates
    // full Time for all Parts
    handleInputTime = (e) => {
        const value = parseInt(e.target.value);
        const calcTime = value * this.state.allParts;
        this.setState({ totalTime: calcTime })
        this.setState({ partTime: value })
    }

    // Full time input also calculates the 
    // time per part
    handleInputTotalTime = (e) => {
        const value = parseInt(e.target.value);
        const timeCalc = value / this.state.allParts;
        this.setState({ partTime: timeCalc })
        this.setState({ totalTime: value })
    }

    render() {
        return (
            // TODO changes after revamp of tasks
            // TODO timed task
            // TODO sessiongoal
            // TODO maybe add icons?
            <div className="editTodo">
                EDIT <i className="far fa-save icon" onClick={this.onSubmit} />
                <i className="far fa-trash-alt icon" onClick={this.deleteTask} />
                <input name="todoName"
                    placeholder="Taskname"
                    autoComplete="off"
                    value={this.state.todoName}
                    onChange={this.handleInputName}
                    onKeyDown={this.checKey} />

                <input name="partNumber"
                    type="number"
                    autoComplete="off"
                    style={{ width: "20%" }}
                    value={this.state.finishedParts}
                    onChange={this.handleFinishedParts}
                    onKeyDown={this.checKey} />
                /
                <input name="allParts"
                    type="number"
                    autoComplete="off"
                    style={{ width: "20%" }}
                    value={this.state.allParts}
                    onChange={this.handleInputAllParts}
                    onKeyDown={this.checKey} />

                <input name="partName"
                    autoComplete="off"
                    style={{ width: "37%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName}
                    onKeyDown={this.checKey} />

                <input
                    name="partTime"
                    type="number"
                    autoComplete="off"
                    style={{ width: "43%" }}
                    value={this.state.partTime}
                    onChange={this.handleInputTime}
                    onKeyDown={this.checKey} />

                <input name="totalTime"
                    type="number"
                    autoComplete="off"
                    style={{ width: "43%" }}
                    value={this.state.totalTime}
                    onChange={this.handleInputTotalTime}
                    onKeyDown={this.checKey} />

            </div>
        )
    }
}
