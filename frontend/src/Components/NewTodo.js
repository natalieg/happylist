import React, { Component } from 'react'
import apis from '../api'

export default class NewTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areaId: props.areaId,
            todoName: '',
            parts: 1,
            partName: '',
            time: '',
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
                parts: 1,
                partName: '',
                time: '',
                difficulty: ''
            })
        }).catch(err => {
            console.log(err)
        })
        this.state.reloadTodo()
    }
    checKey = (e) => {
        if(e.key === "Enter"){
            this.handleSendData()
        }
    }

    render() {
        return (
            <div className={this.state.divClass}>
                <input type="text" name="todoName" placeholder="todoname"
                    value={this.state.todoName}
                    onChange={this.handleInputName} 
                    onKeyDown={this.checKey}/>
                <input type="number" name="parts" placeholder="parts" min="0"
                    style={{ width: "42%" }}
                    value={this.state.parts}
                    onChange={this.handleInputParts} />
                <input type="text" name="partName" placeholder="partname"
                    style={{ width: "42%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName} />
                <input type="number" name="time" placeholder="time"
                    style={{ width: "60%" }}
                    value={this.state.time}
                    onChange={this.handleInputTime} />
                    <label>Minutes</label>
                <input type="number" name="difficulty" placeholder="difficulty"
                    value={this.state.difficulty}
                    onChange={this.handleInputDifficulty} />
                <button onClick={this.handleSendData}>Save</button>
            </div>
        )
    }
}
