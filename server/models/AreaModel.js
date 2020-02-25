const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    todos: [
        {
            todoId: {
                type: String
            },
            todoName: {
                type: String
            },
            partNumber: {
                type: Number
            },
            allParts: {
                type: Number
            },
            partTime: {
                type: Number
            },
            state: {
                type: Boolean,
                default: false
            },
            color: {
                type: String
            }
        }
    ]

})

const todoSchema = new Schema({
    todoName: {
        type: String,
        require: true
    },
    parts: {
        type: Number,
        default: 1
    },
    finishedParts: {
        type: Number,
        default: 0
    },
    partName: {
        type: String,
        default: "Part(s)"
    },
    partTime: {
        type: Number,
        default: 20
    },
    totalTime: {
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
    areaColor: {
        type: String,
        default: "white"
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
const ListModel = mongoose.model('list', listSchema);
module.exports = { UserModel, AreaModel, TodoModel, ListModel };