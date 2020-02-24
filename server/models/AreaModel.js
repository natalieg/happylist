const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    todoName: {
        type: String,
        require: true
    },
    parts: {
        type: Number
    },
    partName: {
        type: String
    },
    time: {
        type: Number,
    },
    difficulty: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    finished: {
        type: Boolean,
        default: false
    },
    areaId: {
        type: String, 
        require: true
    },
    userId: {
        type: String,
        require: true
    }
})

const areaSchema = new Schema({
    areaTitle: {
        type: String
    },
    color: {
        type: String
    },
    priority: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    selected: {
        type: Boolean, 
        default: true
    },
    todoCount: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        require: true
    }
})

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const UserModel = mongoose.model('user', userSchema);
const AreaModel = mongoose.model('area', areaSchema);
const TodoModel = mongoose.model('todo', todoSchema);
module.exports = {UserModel, AreaModel, TodoModel};