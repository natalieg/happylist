import React, { Component } from 'react';
import apis from '../api';
import Validator from 'validator';
import PropTypes from 'prop-types';
import ErrorMessage from './message/ErrorMessage';

export default class NewTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areaId: props.areaId,
            todoName: '',
            parts: 1,
            partName: "Parts",
            time: 10,
            totalTime: 10,
            difficulty: '',
            divClass: "ani1",
            reloadTodo: props.reloadTodo,
            loading:false,
            errors: {}
        }
    }

    onSubmit = (e) =>{
        const data = this.state
        e.preventDefault();
        const errors = this.validate( data ); // do not do enything else if we have errors 
        this.setState({ errors });
    
        if(Object.keys(errors).length === 0){
    
            this.setState({ loading: true });
    
            console.log('trying to transmit data');
    

                this.handleSendData()
      
            
        };
    };

    validate = (data) =>{
        
        
        
        const errors = {}; // the errors var will be empty if we don`t have errors 
       
        if(!data.todoName)  errors.todoName = 'Name cannot be empty';
        if(data.parts <= 0 || (data.parts % 1) != 0) errors.partsStr = 'Parts must be a positive whole number';
        if(data.time <= 0 || (data.parts % 1) != 0)  errors.timeStr = 'Time must be a positive whole number';
        if(data.totalTime <= 0 || (data.totalTime % 1) != 0)  errors.totalTime = 'totalTime must be a positive whole number';




    
        return errors;
    };

    // setTimeout is necessary for the fadein to work
    componentDidMount() {
        setTimeout(() => {
            this.setState({ divClass: "ani2" })
        }, 0
        )
    }

    handleInputName = (e) => {
        const value = e.target.value;
        this.setState({ todoName: value })
    }

    handleInputParts = (e) => {
        const value = e.target.value;
        const timeCalc = value * this.state.time;
        this.setState({ totalTime: timeCalc })
        this.setState({ parts: value })
    }

    handleInputPartName = (e) => {
        const value = e.target.value;
        this.setState({ partName: value })
    }

    // Single Time input calculates
    // full Time for all Parts
    handleInputTime = (e) => {
        const value = parseInt(e.target.value);
        const calcTime = value * this.state.parts;
        this.setState({ totalTime: calcTime })
        this.setState({ time: value })
    }

    // Full time input also calculates the 
    // time per part
    handleInputTotalTime = (e) => {
        const value = parseInt(e.target.value);
        const timeCalc = value / this.state.parts;
        this.setState({ time: timeCalc })
        this.setState({ totalTime: value })
    }

    handleInputDifficulty = (e) => {
        const value = e.target.value;
        this.setState({ difficulty: value })
    }

    // sending and saving data to DB
    handleSendData = async () => {  
        const data = this.state;
        console.log("Sending todo data")
        console.log(data)
        await apis.sendNewTodo(data).then(response => {
            this.setState({
                todoName: '',
                parts: 1,
                partName: "Parts",
                time: 10,
                totalTime: 10,
                difficulty: ''
            })
        }).catch(err => {
            console.log(err)
        })
        this.state.reloadTodo()
    }
    checKey = (e) => {
        if (e.key === "Enter") {
            this.handleSendData()
        }
    }

    render() {
        return (
            <div className={`${this.state.divClass} newTodo`}>
                <input type="text" name="todoName" placeholder="todoname"
                    autoComplete="off"
                    value={this.state.todoName}
                    onChange={this.handleInputName}
                    onKeyDown={this.checKey} />
                    {this.state.errors.todoName && <ErrorMessage text = {this.state.errors.todoName}/>}

                <input type="number" name="parts" placeholder="parts" min="0"
                    autoComplete="off"
                    style={{ width: "42%" }}
                    value={this.state.parts}
                    onChange={this.handleInputParts} />
                    {this.state.errors.partsStr && <ErrorMessage text = {this.state.errors.partsStr}/>}

                <input type="text" name="partName" placeholder="partname"
                    autoComplete="off"
                    style={{ width: "42%" }}
                    value={this.state.partName}
                    onChange={this.handleInputPartName} />
                    {this.state.errors.partName && <ErrorMessage text = {this.state.errors.partName}/>}

                <input type="number" name="time" placeholder="time"
                    autoComplete="off"
                    style={{ width: "40%" }}
                    value={this.state.time}
                    onChange={this.handleInputTime} />
                <label>Minutes</label>
                    {this.state.errors.timeStr && <ErrorMessage text = {this.state.errors.timeStr}/>}

                <input type="number" name="totalTime" placeholder="totalTime"
                    autoComplete="off"
                    style={{ width: "40%" }}
                    value={this.state.totalTime}
                    onChange={this.handleInputTotalTime} />
                    {this.state.errors.totalTime && <ErrorMessage text = {this.state.errors.totalTime}/>}
                <label>Minutes</label>

                {/* <input type="number" name="difficulty" placeholder="difficulty"
                    autocomplete="off"
                    value={this.state.difficulty}
                    onChange={this.handleInputDifficulty} /> */}
                <button onClick={this.onSubmit}>Save</button>
            </div>
        )
    }
}
