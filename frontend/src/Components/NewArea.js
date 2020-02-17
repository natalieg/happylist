import React, { Component } from 'react'

export default class NewArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: '',
            areaTitle: '',
            color: '',
            priority: '',
            cancelClick: props.cancelClick
        }

    }

    setVisibleFalse = () => {
        this.state.visible = false;
    }

    render() {

        return (
            <div className="singleArea newArea">
                <h1>New Area</h1>
                <input placeholder="Area Name"></input><br />
                <button>Save</button>
                <button onClick={this.state.cancelClick}>Cancel</button>
            </div>
        )


    }

}

