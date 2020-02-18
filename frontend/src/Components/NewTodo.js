import React, { Component } from 'react'

export default class NewTodo extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <input type="text" name="todoName" placeholder="todoname"/>
                    <input type="text" name="parts" placeholder="parts" style={{width: "42%"}}/>
                    <input type="text" name="partName" placeholder="partname" style={{width: "42%"}}/>
                    <input type="text" name="time" placeholder="time"/>   
                    <input type="text" name="difficulty" placeholder="difficulty"/>
                </form>
            </div>
        )
    }
}
