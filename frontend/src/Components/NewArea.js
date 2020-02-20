import React, { Component } from 'react'
import apis from '../api';
import { CirclePicker as Circle } from 'react-color';

export default class NewArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: '',
            areaTitle: '',
            color: 'white',
            priority: '',
            cancelClick: props.cancelClick,
            reloadAreas: props.reloadAreas
        }
    }

    handleInputTitle = (e) => {
        const value = e.target.value;
        this.setState({ areaTitle: value })
    }

    handleClickColor = (color) => {
        let rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},0.4)`
        console.log(color)
        this.setState({ color: rgba })
    }

    handleInputColor = (e) => {
        this.setState({ color: e.target.value })
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
            <div className="singleArea newArea" style={{backgroundColor: this.state.color}}>
                <h1>New Area</h1>
                <input
                    name="areaTitle"
                    type="text"
                    value={this.state.areaTitle}
                    onChange={this.handleInputTitle}
                    placeholder="Area Name"
                />
                <Circle
                    className="colorPicker"
                    color={ this.state.color }
                    onChangeComplete={ this.handleClickColor }
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

