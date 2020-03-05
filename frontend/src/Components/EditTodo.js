import React, { Component } from 'react'

export default class EditTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoName: props.todoName
        }
    }

    handleInputName = (e) => {
        const value = e.target.value;
        this.setState({ todoName: value })
    }

    render() {
        return (
            <div className="editTodo">
                EDIT <i class="far fa-save icon"></i>
                <input value={this.state.todoName}
                    onChange={this.handleInputName} />
            </div>
        )
    }
}
