import React, { Component } from 'react'

export default class GenerateList extends Component {
    render() {
        return (
            <div className="list">
                <h1>Generate your List!</h1>
                <div className="row">
                    <div><label>Time</label></div>
                    <div><label>Tasks</label></div>
                </div>
                <div className="row">
                    <div><input type="number" defaultValue="60"/></div>
                    <div><input type="number" defaultValue="10"/></div>
                </div>
                <button>Save</button>
                <button>Cancel</button>
                {/* TODO */}
                <ul>
                    <li>Priority</li>
                    <li>Check/Uncheck Areas</li>
                </ul>
            </div>
        )
    }
}
