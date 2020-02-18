import React, { Component } from 'react';
import SingleArea from './SingleArea';
import NewArea from './NewArea';
import UpperView from './UpperView';
import apis from '../api'
import Navbar from './Navbar/Navbar';

//#Check Pre defined standard colors, maybe change position later
//const areaColors = ['rgba(168, 201, 226, 0.5)', 'rgba(190, 234, 202, 0.4)', 'rgba(245, 242, 189, 0.5)', 'rgba(232, 217, 201, 0.5)', 'rgba(247, 190, 196, 0.6)'];

export default class Areas extends Component {

    state = {
        areas: [],
        isLoading: false,
        dummyCounter: 0,
        allTaskCount: 0,
        newAreaActive: false
    }

    // Loading Areas 
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await apis.getAreaList().then(response => {
            // console.log(response.data)
            this.setState({
                areas: response.data,
                isLoading: false
            })
            this.countTodosFunction();
        })
    }

    handleLoadData = async () => {
        await apis.getAreaList().then(response => {
            console.log(response.data)
            this.setState({
                areas: response.data,
                isLoading: false
            })
        })
    }

    countTodosFunction = () => {
        let countTodos = 0;
        this.state.areas.forEach(element => {
            countTodos += element.todos.length;
        });
        this.setState({ allTaskCount: countTodos })
    }

    // Dummy Add todo
    //remove me later more dummy data stuff
    addTodo = (event) => {
        let indexOfModule = event.target.value;
        let allareas = [...this.state.areas]; // create copy
        //remove me later more dummy data stuff
        this.setState({ dummyCounter: this.state.dummyCounter + 1 });
        // default add thing //#TODO add area that opens when you click here || Or change this button to input field maybe?
        allareas[indexOfModule].todos.unshift('new item ' + this.state.dummyCounter); // manipulate array of item
        this.setState({ areas: allareas });
    }

    // Toggles if the form for New Area is visible or not
    toggleActive = () => {
        const visible = this.state.newAreaActive;
        this.setState({newAreaActive: !visible})
    }

    setNewInactive = () => {
        this.setState({newAreaActive: false})
    }

    render() {
        // Renders all Areas
        let displayareas = this.state.areas.map((module, index) => {
            let taskcount = this.state.areas[index].todos.length;
            let displayTodos = this.state.areas[index].todos.map((todo, ind) => {
                return <p key={ind}>{todo.todoName}</p>
            })

            return (
                <SingleArea id={`singleArea-${index + 1}`} className='singleArea' key={index} 
                btnValue={index} click={this.addTodo} color={module.color} 
                name={module.areaTitle} taskcount={taskcount} tasks={displayTodos} />
            )
        })

        return (
            <div>
                <UpperView areaCount={this.state.areas.length} allTodoCount={this.state.allTaskCount} />
                {/* #TODO Otherwise show areas that already exist */}
                <Navbar name={this.state.newAreaActive ? "Cancel New Area" : "Add Area"} click={this.toggleActive}/>
                <div className='moduleOverview'>
                    {this.state.newAreaActive ? <NewArea cancelClick={this.toggleActive} reloadAreas={this.handleLoadData}/> : null}
                    {displayareas}
                </div>
            </div>
        )
    }
}
