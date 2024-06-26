const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const database = require('./config/database.config');

const apiRouter = require('./routers/index.router');
const { errorHandler } = require('./middlewares/error.midleware');

const app = express();
database.connect();

//Logger -> request
app.use(logger('dev'));

//Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Static router
app.use(express.static(path.join(__dirname, 'public')));

//Api Router
app.use('/api', apiRouter);

// Error handler
app.use(errorHandler);

module.exports = app;