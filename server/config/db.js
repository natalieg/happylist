const mongoose = require('mongoose');

const connectDB = async () =>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{

            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true

        });
        console.log(` MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        return console.log('cant connect', error)
    }
};

module.exports = connectDB;