import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart';
import apis from '../api'

export default class SingleTodo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.todoId,
            todoName: props.todoName,
            color: props.color,
            state: props.state,
            partNumber: props.partNumber,
            allParts: props.allParts,
            todoClassName: '',
            dragging: props.dragging,
            changeState: props.changeState,
            reloadList: props.reloadList,
            hoverActive: false,
            ctrlActive: false
        }
    }


    changeTodoState = (e) => {
        const value = e.target.checked;
        const partNumber = value ? this.state.partNumber + 1 : this.state.partNumber - 1
        const data =
        {
            todoId: this.state.id,
            state: value,
            partNumber: partNumber
        }
        this.saveInDb(data);
        this.setState({
            state: value,
            partNumber: partNumber
        })
    }

    saveInDb = async (data) => {
        await apis.saveCurrentTodo(data)
            .then(response => {

            }).catch(err => {
                console.log(err)
            })
        this.state.reloadList()
    }

    handleMouseOver = (e) => {
        this.setState({ hoverActive: true })
    }

    handleMouseOut = (e) => {
        this.setState({ hoverActive: false })
    }

    increaseTaskNumber = () => {
        this.updateTaskNumber(1)
    }

    decreaseTaskNumber = () => {
        this.updateTaskNumber(-1)
    }

    updateTaskNumber = (value) => {
        let tempPart = this.state.partNumber + value
        let tempState = this.state.state;
        this.setState({ partNumber: tempPart })
        if (tempPart === this.state.allParts) {
            tempState = true;
        }
        if (tempPart <= 0) {
            tempPart = 0
        }
        this.setState({ state: tempState })
        let data = {
            todoId: this.state.id,
            state: tempState,
            partNumber: tempPart
        }
        this.saveInDb(data)
    }


    render() {
        return (
            <div key={this.state.id} className="singleTodo"
                tabIndex="0"

                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}>

                <input type="checkbox"
                    className="checkbox"
                    value={this.state.state}
                    checked={this.state.state}
                    onChange={this.changeTodoState} />
                <label className={this.state.state ? "todoComplete" : "todoIncomplete"}>
                    <span className="todoLabel">{this.state.todoName}</span>
                </label>
                {this.state.hoverActive && !this.state.state ?
                    <span>
                        {this.state.partNumber > 0 &&
                            <i className="fas fas1 fa-chevron-circle-down"
                                onClick={this.decreaseTaskNumber}></i>
                        }
                        <i className="fas fas2 fa-chevron-circle-up"
                            onClick={this.increaseTaskNumber}></i></span>
                    : null
                }
                <span className="partDisplay">{this.state.partNumber}/{this.state.allParts}
                </span>


                {/* <div className="todoColorRef"
                    style={{ backgroundColor: this.state.color }}></div> */}
                <PieChart
                    className="pieChart"
                    cx={50}
                    cy={50}
                    data={[
                        {
                            color: this.state.color,
                            title: 'One',
                            value: this.state.partNumber
                        },
                        {
                            color: "white",
                            title: 'Two',
                            value: this.state.allParts - this.state.partNumber
                        }
                    ]}
                    label={false}
                    lengthAngle={360}
                    lineWidth={100}
                    paddingAngle={0}
                    radius={50}
                    rounded={false}
                    startAngle={0}
                    style={{
                        height: '25px'
                    }}
                    viewBoxSize={[
                        20,
                        20
                    ]}
                />

            </div>
        )
    }
}
