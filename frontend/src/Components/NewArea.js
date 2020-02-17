import React from 'react'

function NewArea(props) {
    if(props.visible){
        return (
            <div className="singleArea newArea">
                <h1>New Area</h1>
                <input placeholder="Area Name"></input><br/>
                <button>Save</button>
                <button onClick={props.hide}>Cancel</button>
            </div>
        )
    }
    return ""
}

export default NewArea;
