import React, { Component } from 'react';
import SingleModule from './SingleModule';
import UpperView from './UpperView';

//#Check Pre defined standard colors, maybe change position later
const areaColors = ['rgba(217, 234, 247, 0.6)', '#dcf2e2', '#e8e7d5', '#e8d9c9', '#f7d9dc'];
const areaColorLength = areaColors.length;

export default class Modules extends Component {

    state = {
        modules: [
            //#Check Dummy Data for Modules with Todos
            { name: "Not Relevant", color: areaColors[(0 % areaColorLength)], todos: ['clean', 'swim'] },
            { name: "Another", color: areaColors[(1 % areaColorLength)], todos: ['do', 'this', 'later'] },
            { name: "Farhan", color: areaColors[(2 % areaColorLength)], todos: ['hang myself', 'do', 'this', 'later'] },
            { name: "Peter", color: areaColors[(3 % areaColorLength)], todos: ['be nice', 'be more nice', 'program', 'do more stuff'] },
            { name: "Sport", color: areaColors[(4 % areaColorLength)], todos: ['running', 'marathon', '5K', '10K', '15k'] },
            { name: "Help", color: areaColors[(5 % areaColorLength)], todos: ['do', 'this', 'later'] },
        ],
        allTodoCount: 0,
        dummyCounter: 0
    }


    // Dummy Add todo
    //remove me later more dummy data stuff
    addTodo = (event) => {
        let indexOfModule = event.target.value;
        let allModules = [...this.state.modules]; // create copy
        //remove me later more dummy data stuff
        this.setState({ dummyCounter: this.state.dummyCounter + 1 });
        // default add thing //#TODO add area that opens when you click here || Or change this button to input field maybe?
        allModules[indexOfModule].todos.unshift('new item ' + this.state.dummyCounter); // manipulate array of item
        this.setState({ modules: allModules });
        console.log(this.state.modules[indexOfModule].todos);
        console.log(event.target.value);
    }


    render() {
        // Intern Count for all Todos that exist
        let allTaskCount = 0;
        let displayModules = this.state.modules.map((module, index) => {
            let taskcount = this.state.modules[index].todos.length;
            allTaskCount = allTaskCount + taskcount;
            let displayTodos = this.state.modules[index].todos.map((todo, ind) => {
                return <p key={ind}>{todo}</p>
            })

            return (
                <SingleModule id={`singleModule-${index + 1}`} className='singleModule' key={index} btnValue={index} click={this.addTodo} color={module.color} name={module.name} taskcount={taskcount} tasks={displayTodos} />
            )
        })

        return (
            <div>
                {/* #TODO if no Modules are created show welcome Text */}
                {/* Is this the right place for the intro page or include in App.js?
                    And if it's included in App.js, how do I check if Modules exist? 
                */}
                <UpperView areaCount={this.state.modules.length} allTodoCount={allTaskCount} />
                {/* #TODO Otherwise show Modules that already exist */}
                <div className='moduleOverview'>
                    {displayModules}
                </div>
            </div>
        )
    }
}
