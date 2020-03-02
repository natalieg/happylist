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
            changeState: props.changeState
        }
    }

    changeTodoState = async (e) => {
        const value = e.target.checked;
        const partNumber = value ? this.state.partNumber + 1 : this.state.partNumber - 1
        const data =
        {
            todoId: this.state.id,
            state: value,
            partNumber: partNumber
        }
        console.log("Inside Frontend ----------------")
        console.log(data)
        await apis.saveCurrentTodo(data)
            .then(response => {
                this.setState({ 
                    state: value, 
                    partNumber: partNumber })
            }).catch(err => {
                console.log(err)
            })
    }

render() {
    return (
        <div key={this.state.id} className="singleTodo">
            <label className={this.state.state ? "todoComplete" : "todoIncomplete"}>
                <input type="checkbox"
                    className="checkbox"
                    value={this.state.state}
                    checked={this.state.state}
                    onChange={this.changeTodoState} />
                <span className="todoLabel">{this.state.todoName}</span>
                <span className="partDisplay">{this.state.partNumber}/{this.state.allParts}
                </span>
            </label>

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
