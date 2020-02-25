var express = require('express');
var router = express.Router();
const { UserModel, AreaModel, TodoModel } = require('../models/AreaModel');
const uuid = require('uuid');

const dummyUser = "User22";

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
    await TodoModel.deleteMany({areaId:areaId})
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
    let { todoName, parts, partName, time, difficulty, userId, areaId } = req.body;
    // FIXME LATER
    userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"
    let newTodo = new TodoModel({
        todoName: todoName,
        parts: parts,
        partName: partName,
        time: time,
        difficulty: difficulty,
        userId: userId,
        areaId: areaId
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
    AreaModel.findOneAndUpdate({_id: areaId}, {$inc : {'todoCount' : 1}})
    .then(response=>{
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
    let { areaIds } = req.body;
    let todoList = await TodoModel.find({ areaId: areaIds });
    res.send(todoList)
})

//Generate List without empty Areas
router.get('/getAreasWithoutEmpty', async (req,res,next)=>{
    let userId = "b6cb5d75-c313-4295-a28f-91541d6470d3"
    let fullAreaIds = await TodoModel.find({userId: userId}, {areaId: 1, _id: 0}).distinct("areaId");
    console.log(fullAreaIds)
    let fullAreas = await AreaModel.find({_id: fullAreaIds})
    res.send(fullAreas)
})

//Count all Todos in Area
router.post('/countTodos', async (req,res,next)=>{
    let { areaId } = req.body;
    let todoList = await TodoModel.find({ areaId: areaId })
    res.send(todoList.length)

// Delete a specific Todo (using id)
router.delete('/deleteTodo', async (req,res,next)=>{
    let {todoId} = req.body;
    await TodoModel.findByIdAndDelete(todoId)
    .then(response =>{
        res.send({msg: 'Todo deleted'})
      })
      .catch( err=>{
        res.send({msg: err})
      })
   

module.exports = router;