import React, { Component } from 'react'
import SingleModule from './SingleModule';
import Welcome from './Welcome'

export default class Modules extends Component {
    state = {
        modules: [
            // Dummy Data for Modules with Todos
            { name: "Test", color: "#d6cbd3", todos: ['clean', 'swim'] },
            { name: "Another", color: "#eca1a6", todos: ['do', 'this', 'later'] },
            { name: "Help", color: "#e3eaa7", todos: ['do', 'this', 'later'] },
        ]
    }

    addTodo = (event) => {
        let indexOfModule = event.target.value;
        // this.setState(   TODO, how to set the state of an item in an array??      });
        console.log(this.state.modules[indexOfModule].todos);
        console.log(event.target.value);
    }

    displayModules = this.state.modules.map((module, index) => {
        let taskcount = this.state.modules[index].todos.length;
        let displayTodos = this.state.modules[index].todos.map((todo, ind) => {
            return <p key={ind}>{todo}</p>
        })

        return (
            <SingleModule key={index} btnValue={index} click={this.addTodo} color={module.color} name={module.name} taskcount={taskcount} tasks={displayTodos} />
        )
    })

    render() {
        return (
            <div>
                {/* #TODO if no Modules are created show welcome Text */}
                {/* Is this the right place for the intro page or include in App.js?
                    And if it's included in App.js, how do I check if Modules exist? 
                */}
                <Welcome/> 
                {/* #TODO Otherwise show Modules that already exist */}
                <div className='moduleOverview'>
                    {this.displayModules}
                </div>
            </div>
        )
    }
}
