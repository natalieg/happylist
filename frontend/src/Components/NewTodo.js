import React, { Component } from 'react'
import apis from '../api'

export default class NewTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areaTitle: props.areaTitle,
            todoName: '',
            parts: '',
            partName: '',
            time: '',
            difficulty: '',
            divClass: "ani1",
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
        this.setState({ parts: value })
    }

    handleInputPartName = (e) => {
        const value = e.target.value;
        this.setState({ partName: value })
    }

    handleInputTime = (e) => {
        const value = e.target.value;
        this.setState({ time: value })
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
                parts: '',
                partName: '',
                time: '',
                difficulty: ''
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className={this.state.divClass}>
                <input type="text" name="todoName" placeholder="todoname"
                    value={this.state.todoName}
                    onChange={this.handleInputName} />
                <input type="text" name="parts" placeholder="parts"
                    style={{ width: "42%" }}
                    value={this.state.parts}
                    onChange={this.handleInputParts} />
                <input type="text" name="partName" placeholder="partname"
                    style={{ width: "42%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName} />
                <input type="text" name="time" placeholder="time"
                    value={this.state.time}
                    onChange={this.handleInputTime} />
                <input type="text" name="difficulty" placeholder="difficulty"
                    value={this.state.difficulty}
                    onChange={this.handleInputDifficulty} />
                <button onClick={this.handleSendData}>Save</button>
            </div>
        )
    }
}
