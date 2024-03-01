import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import database from './config/database.config';

import apiRouter from './routers/index.router';

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
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;