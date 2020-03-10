import React, { Component } from 'react'
import apis from '../api'
import SingleTodo from './SingleTodo'

export default class GenerateList extends Component {
    constructor() {
        super()

        this.state = {
            userTime: 60,
            userMaxTasks: 10,
            areas: [],
            activeAreas: [],
            todoList: [],
            currentTodoListCount: 0,
            isLoading: false,
            isDragging: false,
            hideComplete: false,
            showSettings: true
        }
    }

    // Loads a saved list
    loadSavedList = async () => {
        await apis.getCurrentList().then(response => {
            let data = response.data[0]
            console.log("RESPONSE DATA", response.data)
            if (response.data[0] != null) {
                let tempTodos = [...data.todos]
                if (tempTodos.length > 0) {
                    this.setState({
                        todoList: tempTodos,
                        hideComplete: data.hideComplete,
                        showSettings: data.showSettings,
                        userMaxTasks: data.maxNumber,
                        currentTodoListCount: tempTodos.length
                    })
                }
            }
        })
    }

    // Loading Areas and saved Lists
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.loadSavedList();
        await apis.getAreasWithoutEmpty().then(response => {
            let tempActive = [];
            response.data.forEach(element => {
                tempActive.push({
                    id: element._id,
                    state: true,
                    areaTitle: element.areaTitle,
                    color: element.color,
                    todoCount: element.incompleteTodoCount
                })
            });
            this.setState({
                areas: response.data,
                isLoading: false,
                activeAreas: tempActive
            })
        })
    }

    toggleHideComplete = () => {
        const oldState = this.state.hideComplete;
        this.setState({ hideComplete: !oldState })
    }

    toggleSettings = () => {
        const oldState = this.state.showSettings;
        this.setState({ showSettings: !oldState })
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

    /*
    Creating a new Todo List
    */
    createTodoList = async () => {
        this.setState({
            isLoading: true,
        })
        let areaIds = []
        this.state.activeAreas.forEach(area => {
            if (area.state) {
                areaIds.push(area.id)
            }
        });
        // Generate List and save data in DB
        await apis.generateList({
            areaIds: areaIds,
            hideComplete: this.state.hideComplete,
            showSettings: this.state.showSettings,
            maxNumber: this.state.userMaxTasks
        })
            .then(response => {
                let tempTodo = [];
                response.data.forEach(todo => {
                    tempTodo.push({
                        todoId: todo._id,
                        todoName: todo.todoName,
                        partNumber: todo.finishedParts,
                        allParts: todo.allParts,
                        partTime: todo.partTime,
                        color: todo.areaColor,
                        state: false
                    })
                })
                console.log(tempTodo)
                this.setState({
                    todoList: []
                })
                this.setState({
                    todoList: tempTodo,
                    currentTodoListCount: tempTodo.length,
                    isLoading: false
                })
            })
            // FIXME ? Hide settings when generating?
            //this.setState({showSettings: false})
    }

    /* Drag & Drop */
    onDragStart = (e, index) => {
        this.draggedItem = this.state.todoList[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target, 100, 20);
        this.setState({ isDragging: true })
    };

    onDragOver = index => {
        const draggedOverItem = this.state.todoList[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let todoList = this.state.todoList.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        todoList.splice(index, 0, this.draggedItem);

        this.setState({ todoList });
    };

    onDragEnd = () => {
        this.draggedIdx = null;
        this.setState({ isDragging: false })

    };
    /////// End Drag & Drop

    //change Selected Areas
    changeActiveAreas = (e) => {
        let tempActive = this.state.activeAreas;
        var foundIndex = tempActive.findIndex(x => x.id === e.target.id);
        tempActive[foundIndex].state = !tempActive[foundIndex].state;
        this.setState({ activeAreas: tempActive })
    }

    handleInputTask = (e) => {
        const value = e.target.value;
        this.setState({ userMaxTasks: value })
    }

    handleInputTime = (e) => {
        const value = e.target.value;
        this.setState({ userTime: value })
    }

    render() {
        let allAreas = null;
        if (this.state.activeAreas.length > 0) {
            allAreas = this.state.activeAreas.map((area, index) => {
                return (
                    <div key={area.id}
                        className="selectArea"
                        style={{ backgroundColor: area.color }}>
                        <label>
                            <input type="checkbox"
                                onChange={this.changeActiveAreas}
                                checked={area.state} id={area.id} />
                            {area.areaTitle} : {area.todoCount}
                        </label></div>
                )
            })
        }
        let generatedList = null;
        if (this.state.todoList.length > 0) {
            generatedList = this.state.todoList.map((todo, index) => {
                if (this.state.hideComplete && todo.state) {
                    return null
                } else {
                    return (
                        <div className="dragContainer" key={todo.todoId} draggable
                            onDragOver={() => this.onDragOver(index)}
                            onDragStart={e => this.onDragStart(e, index)}
                            onDragEnd={this.onDragEnd}>
                            <SingleTodo
                                key={todo.todoId}
                                todoId={todo.todoId}
                                todoName={todo.todoName}
                                color={todo.color}
                                partNumber={todo.partNumber}
                                allParts={todo.allParts}
                                state={todo.state}
                                dragging={this.state.isDragging}
                                reloadList={this.loadSavedList}
                            />
                        </div>
                    )
                }

            })
        }

        return (
            <div className="list">
                <h1>Generate your List!</h1>
                <button onClick={this.createTodoList}>Create</button>
                <button onClick={this.toggleSettings}>Settings</button>
                {this.state.showSettings &&
                    <div className="settings">
                        <div className="row">
                            <div><label>Time</label></div>
                            <div><label>Tasks</label></div>
                        </div>
                        <div className="row">
                            <div><input type="number" onChange={this.handleInputTime} value={this.state.userTime} /></div>
                            <div><input type="number" onChange={this.handleInputTask} value={this.state.userMaxTasks} /></div>
                        </div>
                        <div className="selectAreasDiv">
                            {allAreas}
                        </div>
                    </div>
                }
                <div draggable="false">
                    {this.state.currentTodoListCount > 0 ?
                        <div className="visibleListWrapper">
                            <div>Current Todos: {this.state.currentTodoListCount}</div>
                            <input className="button" type='button' value={this.state.hideComplete ? "Show Complete" : "Hide Completed"} onClick={this.toggleHideComplete} />
                            <div className="generatedListWrapper">{generatedList}</div>
                        </div>
                        : null}
                </div>

                {/* TODO */}
                {/* <p>Priority</p> */}
            </div>
        )
    }
}
