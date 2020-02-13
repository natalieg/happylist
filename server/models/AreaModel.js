const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const todoSchema = {
//     name: {
//         type: String,
//         require: true
//     },
//     time: {
//         type: Number,
//         require: true
//     },
//     difficulty: {
//         type: String, 
//         require: true
//     }
// }


// const areaSchema = {
//     id: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         require: true
//         // unique: true
//     },
//     priority: {
//         type: String
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     todos: [
//         todoSchema
//     ]
// }

const areaSchema = new Schema({
    areaTitle: {
        type: String
    }
})

const userSchema = new mongoose.Schema ({
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
    },
    areas: [areaSchema]
})

const AreaModel = mongoose.model('user', userSchema );
module.exports = AreaModel;