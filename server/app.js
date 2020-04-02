var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

dotenv.config({ path: './config/config.env' })

connectDB()

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//FIXME Test
app.set('view engine', 'jade');

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
