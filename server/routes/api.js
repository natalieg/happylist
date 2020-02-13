var express = require('express');
var router = express.Router();
const AreaModel = require('../models/AreaModel');
const uuid = require('uuid');

const dummyUser = "User22";

/* TODO Get Areas from DB
 Get Areas for Logged in User
 TODO: Right now we are using a {dummyUser} for the User 
 it will be changed to a Logged in User once we have a 
 Login Function
 */
router.get('/areas', async (req, res, next) => {
    let currentUser = await AreaModel.findOne({ name: dummyUser });
    console.log(currentUser.email)
    res.send(currentUser.areas)
})


// Test Display
router.get('/hello', (req, res, next) => {
    res.send("HI")
})

// Create New User
router.post('/newUser', (req, res, next) => {
    let { name, email, password, areas } = req.body;
    console.log(req.body)
    let newUser = new AreaModel({
        id: uuid.v4(),
        name: name,
        email: email,
        password: password,
        areas: areas
    })
    console.log(newUser)
    console.log(newUser.areas[0].areaTitle)

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

// Create New Area
router.post('/newArea', (req, res, next) => {
    let { areaTitle, color, priority, date } = req.body;
    let newArea = {
        areaTitle: areaTitle,
        color: color,
        priority: priority
    }
    AreaModel.findOneAndUpdate({ name: dummyUser }, { $push: { areas: newArea } }, {
        new: true
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    res.send("Added Are")
})

module.exports = router;