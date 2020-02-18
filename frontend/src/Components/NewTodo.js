import React, { Component } from 'react'
import "./test.css"
export default class NewTodo extends Component {
    constructor(props){
        super(props)

        this.state = {
            divClass: "ani1",
        }
    }

    // setTimeout is necessary for the fadein to work
    componentDidMount() {
        setTimeout(()=>{
            this.setState({divClass:"ani2"})
        },0
        )
    }

    render() {
        return (
            <div className={this.state.divClass}>
                <form action="">
                    <input type="text" name="todoName" placeholder="todoname"/>
                    <input type="text" name="parts" placeholder="parts" style={{width: "42%"}}/>
                    <input type="text" name="partName" placeholder="partname" style={{width: "42%"}}/>
                    <input type="text" name="time" placeholder="time"/> 
                    <input type="text" name="difficulty" placeholder="difficulty"/>
                </form>
            </div>
        )
    }
}
