const { TodoModel} = require('../models/AreaModel');


 const deleteTodos = async(todoIds) => {
    await TodoModel.deleteMany({ _id: {$in: todoIds} })
}



module.exports = {deleteTodos}