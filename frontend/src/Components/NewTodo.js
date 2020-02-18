import React, { Component } from 'react'

export default class NewTodo extends Component {
    render() {
        return (
            <div>
                <h1>ABC</h1>
                <form action="">
                    <label htmlFor="todoName">todoname</label>
                    <input type="text" name="todoName"/>
                    <label htmlFor="parts">parts</label>
                    <input type="text" name="parts"/>
                    <label htmlFor="partName">partname</label>
                    <input type="text" name="partName"/>
                    <label htmlFor="time">time</label>
                    <input type="text" name="time"/>
                    <label htmlFor="difficulty">difficulty</label>
                    <input type="text" name="difficulty"/>

                </form>
            </div>
        )
    }
}
