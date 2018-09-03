const express = require('express');
const api_mysqlRouter = express.Router();
const artists_mysqlRouter = require('./artists_mysql.js');

apiRouter.use('/artists_mysql', artists_mysqlRouter);

module.exports = api_mysqlRouter;
