import React, { Component } from 'react';
import apis from '../api';
import ErrorMessage from './message/ErrorMessage';
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default class NewTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areaId: props.areaId,
            todoName: '',
            parts: 1,
            partName: "Parts",
            sessionGoal: 1,
            time: 10,
            totalTime: 10,
            difficulty: '',
            divClass: "ani1",
            reloadTodo: props.reloadTodo,
            loading: false,
            errors: {},
            errorText: "",
            numError: false,
            numErrorText: "",
            updateAreas: props.updateAreas
        }
    }

    onSubmit = (e) => {
        const data = this.state
        const errors = this.validate(data); // do not do enything else if we have errors 
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            console.log('trying to transmit data');
            this.handleSendData()
        };
    };

    validate = (data) => {
        this.setState({ numError: false, numErrorText: "" })
        const errors = {}; // the errors var will be empty if we don`t have errors 
        let numErr = "" // String for the Number errors

        if (!data.todoName) errors.todoName = 'Name cannot be empty!';
        if (data.parts <= 0 || (data.parts % 1) !== 0) {
            errors.partsStr = 'Parts';
            numErr += 'Parts, '
        };
        if (data.time <= 0 || (data.time % 1) !== 0) {
            errors.timeStr = 'Time ';
            numErr += 'Time, '
        }
        if (data.totalTime <= 0 || (data.totalTime % 1) !== 0) {
            errors.totalTime = 'TotalTime'
            numErr += 'Total Time'
        };

        if (errors.partsStr || errors.timeStr || errors.totalTime) {
            this.setState({ numError: true, numErrorText: numErr })
        }

        return errors;
    };

    // setTimeout is necessary for the fadein to work
    componentDidMount() {
        this.taskTitleInput.focus();
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

    handleInputSessionGoal = (e) => {
        const value = e.target.value;
        this.setState({ sessionGoal: value })
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
        await apis.sendNewTodo(data).then(response => {
            this.setState({
                todoName: '',
                // parts: 1,
                partName: "Parts",
                time: 10,
                // totalTime: 10,
                difficulty: ''
            })
        }).catch(err => {
            console.log(err)
        })
        this.state.reloadTodo()
        this.state.updateAreas()
    }

    checKey = (e) => {
        if (e.key === "Enter") {
            this.onSubmit()
        }
    }

    render() {
        return (
            <div className="newTodoWrap">
                <div className="errorMessages">
                    {this.state.errors.todoName && <ErrorMessage text={this.state.errors.todoName} />}
                    {this.state.numError ? `Please Check: ${this.state.numErrorText}` : null}
                </div>
                <div className={`${this.state.divClass} newTodo`}>

                    <input
                        ref={(input) => { this.taskTitleInput = input; }}
                        type="text" name="todoName" placeholder="Taskname"
                        className={`${this.state.errors.todoName ? "inputError" : null} taskNameInput`}
                        autoComplete="off"
                        value={this.state.todoName}
                        onChange={this.handleInputName}
                        onKeyDown={this.checKey} />

                    <p className="taskGoal">
                        {/* FIXME: STYLING */}
                        <Tooltip title="Goal for this Task" arrow placement="left">
                            <span>
                                <i className="fas fa-trophy"></i>
                                <input type="number" name="parts" placeholder="parts" min="0"
                                    className={this.state.errors.partsStr ? "inputError" : null}
                                    autoComplete="off"
                                    style={{ width: "20%" }}
                                    value={this.state.parts}
                                    onChange={this.handleInputParts}
                                    onKeyDown={this.checKey} />
                                <input type="text" name="partName" placeholder="partname"
                                    autoComplete="off"
                                    style={{ width: "30%" }}
                                    value={this.state.partName}
                                    onChange={this.handleInputPartName}
                                    onKeyDown={this.checKey} />
                            </span>
                        </Tooltip>
                        {/* FIXME: POSITION */}
                        <Tooltip title="is it a time goal?" arrow placement="top-end">
                            <span>
                                <input id="timeGoalCheck" type="checkbox" className="checkbox" />
                                <label htmlFor="timeGoalCheck"></label>
                            </span>
                        </Tooltip>
                    </p>
                    <Tooltip title="How much do you want to do in a session?" arrow placement="left">
                        <p>
                            <i className="fas fa-puzzle-piece" />
                            <input
                                name="sessionGoal"
                                type="number"
                                autoComplete="off"
                                style={{ width: "20%" }}
                                value={this.state.sessionGoal}
                                onChange={this.handleInputSessionGoal}
                                onKeyDown={this.checKey} />
                            <select
                                style={{ width: "52%" }}
                                name="sessionGoalType">
                                <option value={this.state.partName}>{this.state.partName}</option>
                                <option value="Minutes">Minutes</option>
                                <option value="Hours">Hours</option>
                            </select>
                        </p>
                    </Tooltip>

                    <p>
                        <Tooltip title="Time per Part" arrow placement="left">

                            <span>
                                <i className="fas fa-clock"></i>
                                <input type="number" name="time" placeholder="time"
                                    className={this.state.errors.timeStr ? "inputError" : null}
                                    autoComplete="off"
                                    style={{ width: "25%" }}
                                    value={this.state.time}
                                    onChange={this.handleInputTime}
                                    onKeyDown={this.checKey} />
                                <label className="timeLabel">min</label>
                            </span>
                        </Tooltip>
                        <Tooltip title="Overall Time" arrow placement="right">
                            <span>
                                <input type="number" name="totalTime" placeholder="totalTime"
                                    className={this.state.errors.totalTime ? "inputError" : null}
                                    autoComplete="off"
                                    style={{ width: "25%" }}
                                    value={this.state.totalTime}
                                    onChange={this.handleInputTotalTime}
                                    onKeyDown={this.checKey} />
                                <label className="timeLabel">min</label>
                            </span>
                        </Tooltip>
                    </p>





                    {/* <input type="number" name="difficulty" placeholder="difficulty"
                    autocomplete="off"
                    value={this.state.difficulty}
                    onChange={this.handleInputDifficulty} /> */}
                    <button onClick={this.onSubmit}>Save</button>
                </div>
            </div>
        )
    }
}
