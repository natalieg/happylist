import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart';
import apis from '../api'

export default class SingleTodo extends Component {

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

    handleMouseOver = () => {
        this.setState({ hoverActive: true })
    }

    handleMouseOut = () => {
        this.setState({ hoverActive: false })
    }

    updateTaskNumber = () => {
        let tempPart = this.state.partNumber + 1
        let tempState = this.state.state;
        this.setState({ partNumber: tempPart })
        if (tempPart === this.state.allParts) {
            tempState = true;
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
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
            >

                <input type="checkbox"
                    className="checkbox"
                    value={this.state.state}
                    checked={this.state.state}
                    onChange={this.changeTodoState} />
                <label className={this.state.state ? "todoComplete" : "todoIncomplete"}>
                    <span className="todoLabel">{this.state.todoName}</span>
                </label>
                {this.state.hoverActive && !this.state.state ?
                    <span><i class="fas fa-chevron-circle-up"
                        onClick={this.updateTaskNumber}></i></span>
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
