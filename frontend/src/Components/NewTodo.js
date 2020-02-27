import React, { Component } from 'react'
import apis from '../api'

export default class NewTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areaId: props.areaId,
            todoName: '',
            parts: 1,
            partName: "Parts",
            time: 10,
            totalTime: 10,
            difficulty: '',
            divClass: "ani1",
            reloadTodo: props.reloadTodo
        }
    }

    // setTimeout is necessary for the fadein to work
    componentDidMount() {
        setTimeout(() => {
            this.setState({ divClass: "ani2" })
        }, 0
        )
    }

    handleInputName = (e) => {
        const value = e.target.value;
        this.setState({ todoName: value })
    }

    handleInputParts = (e) => {
        const value = e.target.value;
        const timeCalc = value * this.state.time;
        this.setState({ totalTime: timeCalc })
        this.setState({ parts: value })
    }

    handleInputPartName = (e) => {
        const value = e.target.value;
        this.setState({ partName: value })
    }

    // Single Time input calculates
    // full Time for all Parts
    handleInputTime = (e) => {
        const value = parseInt(e.target.value);
        const calcTime = value * this.state.parts;
        this.setState({ totalTime: calcTime })
        this.setState({ time: value })
    }

    // Full time input also calculates the 
    // time per part
    handleInputTotalTime = (e) => {
        const value = parseInt(e.target.value);
        const timeCalc = value / this.state.parts;
        this.setState({ time: timeCalc })
        this.setState({ totalTime: value })
    }

    handleInputDifficulty = (e) => {
        const value = e.target.value;
        this.setState({ difficulty: value })
    }

    handleSendData = async () => {
        const data = this.state;
        console.log("Sending todo data")
        console.log(data)
        await apis.sendNewTodo(data).then(response => {
            this.setState({
                todoName: '',
                parts: 1,
                partName: "Parts",
                time: 10,
                totalTime: 10,
                difficulty: ''
            })
        }).catch(err => {
            console.log(err)
        })
        this.state.reloadTodo()
    }
    checKey = (e) => {
        if (e.key === "Enter") {
            this.handleSendData()
        }
    }

    render() {
        return (
            <div className={`${this.state.divClass} newTodo`}>
                <input type="text" name="todoName" placeholder="todoname"
                    autoComplete="off"
                    value={this.state.todoName}
                    onChange={this.handleInputName}
                    onKeyDown={this.checKey} />
                <input type="number" name="parts" placeholder="parts" min="0"
                    autoComplete="off"
                    style={{ width: "42%" }}
                    value={this.state.parts}
                    onChange={this.handleInputParts} />
                <input type="text" name="partName" placeholder="partname"
                    autoComplete="off"
                    style={{ width: "42%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName} />
                <input type="number" name="time" placeholder="time"
                    autoComplete="off"
                    style={{ width: "40%" }}
                    value={this.state.time}
                    onChange={this.handleInputTime} />
                <label>Minutes</label>
                <input type="number" name="totalTime" placeholder="totalTime"
                    autoComplete="off"
                    style={{ width: "40%" }}
                    value={this.state.totalTime}
                    onChange={this.handleInputTotalTime} />
                <label>Minutes</label>
                {/* <input type="number" name="difficulty" placeholder="difficulty"
                    autocomplete="off"
                    value={this.state.difficulty}
                    onChange={this.handleInputDifficulty} /> */}
                <button onClick={this.handleSendData}>Save</button>
            </div>
        )
    }
}
