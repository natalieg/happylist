import React, { Component }  from 'react'

export default class NewArea extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            visible: props.visible,
            areaTitle: '',
            color: '',
            priority: ''
        }

    }

    setVisibleFalse = () => {
        this.state.visible = false;
    }

    render(){
        if(this.state.visible){
            return (
                <div className="singleArea newArea">
                    <h1>New Area</h1>
                    <input placeholder="Area Name"></input><br/>
                    <button>Save</button>
                    <button onClick={this.setVisibleFalse}>Cancel</button>
                </div>
            )
        }
        return ""
    }

}

