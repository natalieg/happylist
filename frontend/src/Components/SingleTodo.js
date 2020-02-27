import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart';


export default class SingleTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.todoId,
            todoName: props.todoName,
            color: props.color,
            state: props.state,
            partNumber: props.partNumber - 1,
            allParts: props.allParts,
            todoClassName: ''
        }
    }

    changeTodoState = (e) => {
        const value = e.target.checked;
        this.setState({ state: value })
        if (value) {
            this.setState({ todoClassName: "todoComplete" })
            this.setState({ partNumber: this.state.partNumber + 1 })
        } else {
            this.setState({ todoClassName: "todoIncomplete" })
            this.setState({ partNumber: this.state.partNumber - 1 })
        }
    }

    render() {
        return (
            <div key={this.state.id} className="singleTodo">
                <label className={this.state.todoClassName}>
                    <input type="checkbox"
                        className="checkbox"
                        value={this.state.state}
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
