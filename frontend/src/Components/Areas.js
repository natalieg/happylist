import React, { Component } from 'react';
import SingleArea from './SingleArea';
import UpperView from './UpperView';
import apis from '../api'

//#Check Pre defined standard colors, maybe change position later
const areaColors = ['rgba(168, 201, 226, 0.5)', 'rgba(190, 234, 202, 0.4)', 'rgba(245, 242, 189, 0.5)', 'rgba(232, 217, 201, 0.5)', 'rgba(247, 190, 196, 0.6)'];
const areaColorLength = areaColors.length;

export default class Areas extends Component {

    state = {
        areas: [],
        isLoading: false,
        allTodoCount: 0,
        dummyCounter: 0
    }

    componentDidMount = async () => {
        this.setState({isLoading: true})
        await apis.getAreaList().then(response => {
            console.log(response.data)
            this.setState({
                areas: response.data,
                isLoading:false
            })
        })
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
        console.log(this.state.areas[indexOfModule].todos);
        console.log(event.target.value);
    }


    render() {
        // Intern Count for all Todos that exist
        let allTaskCount = 0;
        let displayareas = this.state.areas.map((module, index) => {
            let taskcount = this.state.areas[index].todos.length;
            allTaskCount = allTaskCount + taskcount;
            let displayTodos = this.state.areas[index].todos.map((todo, ind) => {
                return <p key={ind}>{todo}</p>
            })

            return (
                <SingleArea id={`singleArea-${index + 1}`} className='singleArea' key={index} btnValue={index} click={this.addTodo} color={module.color} name={module.areaTitle} taskcount={taskcount} tasks={displayTodos} />
            )
        })

        return (
            <div>
                {/* #TODO if no areas are created show welcome Text */}
                {/* Is this the right place for the intro page or include in App.js?
                    And if it's included in App.js, how do I check if areas exist? 
                */}
                <UpperView areaCount={this.state.areas.length} allTodoCount={allTaskCount} />
                {/* #TODO Otherwise show areas that already exist */}
                <div className='moduleOverview'>
                    {displayareas}
                </div>
            </div>
        )
    }
}
