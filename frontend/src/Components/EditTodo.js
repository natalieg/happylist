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

    onSubmit = (e) => {
        const data = this.state
        // e.preventDefault();
        this.handleSendData()
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
        this.setState({finishedParts: value})
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
            <div className="editTodo">
                EDIT <i class="far fa-save icon" onClick={this.onSubmit}/>
                <input name="todoName"
                    placeholder="Taskname"
                    value={this.state.todoName}
                    onChange={this.handleInputName}
                    onKeyDown={this.checKey} />

                <input name="partNumber"
                    style={{ width: "20%" }}
                    value={this.state.finishedParts}
                    onChange={this.handleFinishedParts}
                    onKeyDown={this.checKey} />
                /
                <input name="allParts"
                    style={{ width: "20%" }}
                    value={this.state.allParts}
                    onChange={this.handleInputAllParts}
                    onKeyDown={this.checKey} />

                <input name="partName"
                    style={{ width: "37%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName}
                    onKeyDown={this.checKey} />

                <input
                    name="partTime"
                    style={{ width: "43%" }}
                    value={this.state.partTime}
                    onChange={this.handleInputTime}
                    onKeyDown={this.checKey} />

                <input name="totalTime"
                    style={{ width: "43%" }}
                    value={this.state.totalTime}
                    onChange={this.handleInputTotalTime}
                    onKeyDown={this.checKey} />

            </div>
        )
    }
}
