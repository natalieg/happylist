var express = require('express');
var router = express.Router();
const { UserModel, AreaModel, TodoModel, ListModel } = require('../models/AreaModel');
const uuid = require('uuid');
const { generateList } = require('../controller/generateList')

const dummyUser = "User22";
const userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"

/* TODO Get Areas from DB
 Get Areas for Logged in User
 TODO: Right now we are using a {dummyUser} for the User 
 it will be changed to a Logged in User once we have a 
 Login Function
 */
router.get('/areas', async (req, res, next) => {
    let currentUser = await UserModel.findOne({ name: dummyUser });
    let userId = currentUser.id;
    let allAreas = await AreaModel.find({ userId: userId }).sort({ "date": -1 })

    let todos = await TodoModel.find({ userId: userId }).sort({ "date": -1 })
    let areaWithTodo = allAreas.map(area => {
        let areaTodos = todos.filter(todo => {

            return todo.areaId === area._id.toString()
        })

        return { ...area.toObject(), todos: areaTodos };
    });

    res.send(areaWithTodo)
})

// Create New User
router.post('/newUser', (req, res, next) => {
    let { name, email, password, areas } = req.body;
    console.log(req.body)
    let newUser = new UserModel({
        id: uuid.v4(),
        name: name,
        email: email,
        password: password,
    })

    newUser.save()
        .then(response => {
            console.log(response)
            res.send({ msg: 'done' })
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
})

// Create new Area
router.post('/newArea', (req, res, next) => {
    let { areaTitle, color, priority, userId } = req.body;
    // FIXME LATER
    userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"
    let newArea = new AreaModel({
        areaTitle: areaTitle,
        color: color,
        priority: priority,
        userId: userId
    })
    newArea.save()
        .then(response => {
            console.log(response)
            res.send({ msg: 'Saved Area' })
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
})

// Delete Area
router.delete('/deleteArea', async (req, res, next) => {
    let areaId = req.body.areaId
    console.log(req.body)
    await TodoModel.deleteMany({ areaId: areaId })
    await AreaModel.findByIdAndDelete(areaId)
        .then(response => {
            res.send({ msg: 'Area deleted' })
        })
        .catch(err => {
            res.send({ msg: err })
        })
})

// Create new ToDo
router.post('/newTodo', async (req, res, next) => {
    let { todoName, parts, partName, time, totalTime, difficulty, userId, areaId } = req.body;
    // FIXME LATER
    userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"
    let color = await AreaModel.findOne({ _id: areaId }, { color: 1, _id: 0 })
    let newTodo = new TodoModel({
        todoName: todoName,
        allParts: parts,
        partName: partName,
        time: time,
        totalTime: totalTime,
        difficulty: difficulty,
        userId: userId,
        areaId: areaId,
        areaColor: color.color
    })
    newTodo.save()
        .then(response => {
            console.log(response)
            res.send({ msg: 'Saved Todo' })
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
    AreaModel.findOneAndUpdate({ _id: areaId }, { $inc: { 'todoCount': 1 } })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
})

// Load all Todos for one Area
router.post('/getTodos', async (req, res, next) => {
    let { areaId } = req.body;
    let todoList = await TodoModel.find({ areaId: areaId }).sort({ "date": -1 })
    res.send(todoList)
})

//Generate List for chosen Areas
router.post('/generateList', async (req, res, next) => {
    let { areaIds, maxNumber } = req.body;
    let todoList = await TodoModel.find({ areaId: areaIds });
    let generatedList = generateList(todoList, areaIds, maxNumber)

    let tempList = []
    generatedList.forEach(todo => {
        tempList.push({
            todoId: todo._id,
            todoName: todo.todoName,
            partNumber: todo.finishedParts,
            allParts: todo.allParts,
            partTime: todo.partTime,
            state: false,
            color: todo.areaColor
        })
    });
    let newList = {
        //FIXME LATER
        userId: userId,
        todos: tempList
    }
    ListModel.findOneAndUpdate({ userId: userId }, newList, {
        upsert: true
    })
        .then(response => {
            // console.log(response)
            res.send(generatedList)
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
})

//Save current Todo
router.post('/saveCurrentTodo', async (req, res, next) => {
    let user = userId; // Fixme Later
    let { todoId, state, partNumber } = req.body;
    console.log("IM HERE")
    console.log(todoId, state, partNumber)
    await ListModel.updateOne(
        { userId: user, "todos.todoId": todoId },
        {
            $set: {
                "todos.$.state": state,
                "todos.$.partNumber": partNumber
            }
        }
    )
        .then(response => {
            // console.log(response)
            res.send("Todo saved successfully!")
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })
})

//Load current generated List
router.get('/getCurrentList', async (req, res, next) => {
    let list = await ListModel.find({ userId: userId })
        .then(response => {
            // console.log(response)
            res.send(response)
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        });
})

//Generate List without empty Areas
router.get('/getAreasWithoutEmpty', async (req, res, next) => {
    let userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"
    let fullAreaIds = await TodoModel.find({ userId: userId }, { areaId: 1, _id: 0 }).distinct("areaId");
    let fullAreas = await AreaModel.find({ _id: fullAreaIds })
    res.send(fullAreas)
})

//Count all Todos in Area
router.post('/countTodos', async (req, res, next) => {
    let { areaId } = req.body;
    let todoList = await TodoModel.find({ areaId: areaId })
    res.send(todoList.length)
})

// Delete a specific Todo (using id)
router.delete('/deleteTodo', async (req, res, next) => {
    let { todoId } = req.body;
    let area = await TodoModel.findOne({ _id: todoId }, { areaId: 1, _id: 0 })

    await TodoModel.findByIdAndDelete(todoId)
        .then(response => {
            res.send({ msg: 'Todo deleted' })
        })
        .catch(err => {
            res.send({ msg: err })
        })
    AreaModel.findOneAndUpdate({ _id: area.areaId }, { $inc: { 'todoCount': -1 } })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            res.send({ msg: err })
        })

})

module.exports = router;