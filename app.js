const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//Logger -> request
app.use(logger('dev'));

//Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static router
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
