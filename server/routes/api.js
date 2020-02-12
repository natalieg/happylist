var express = require('express');
var router = express.Router();
const AreaModel = require('../models/AreaModel');
const uuid = require('uuid');

// TODO Get Areas from DB

// Test Display
router.get('/hello', (req,res,next)=>{
    res.send("HI")
})

// Create New User
router.post('/newUser', (req,res,next)=>{
    let {name, email, password, areaName, areaPrio} = req.body;
    console.log(req.body)
    let newUser = new AreaModel({
        id: uuid.v4(),
        name: name,
        email: email, 
        password: password, 
        areas: [
            {
                id: uuid.v4(),
                name: areaName,
                priority: areaPrio
            }
        ]
    })

    newUser.save()
    .then(response => {
        console.log(response)
        res.send({msg: 'done'})
    })
    .catch(err=>{
        console.log(err)
        res.send({msg: err})
    })
})

module.exports = router;