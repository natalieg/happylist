import React, { Component } from 'react'
import apis from '../api'

export default class NewArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: '',
            areaTitle: '',
            color: '',
            priority: '',
            cancelClick: props.cancelClick,
            reloadAreas: props.reloadAreas
        }
    }

    handleInputTitle = (e) => {
        const value = e.target.value;
        this.setState({ areaTitle: value })
    }

    handleInputColor = (e) => {
        const value = e.target.value;
        this.setState({ color: value })
    }


    handleSendData = async () => {
        const data = this.state;
        await apis.sendNewArea(data).then(response => {
            this.setState({
                areaTitle: '',
                color: '',
                priority: '',
            })
        }).catch(err => {
            console.log(err)
        })
        this.state.reloadAreas()
        this.state.cancelClick()
    }

    render() {
        return (
            <div className="singleArea newArea">
                <h1>New Area</h1>
                <input
                    name="areaTitle"
                    type="text"
                    value={this.state.areaTitle}
                    onChange={this.handleInputTitle}
                    placeholder="Area Name"
                />
                    <input
                    name="color"
                    type="text"
                    value={this.state.color}
                    onChange={this.handleInputColor}
                    placeholder="Area Color"
                /><br />
                <button onClick={this.handleSendData}>Save</button>
                <button onClick={this.state.cancelClick}>Cancel</button>
            </div>
        )
    }
}

