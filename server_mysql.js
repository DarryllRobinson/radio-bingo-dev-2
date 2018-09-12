const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');

const mysql = require('mysql');
const connection = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'radio_bingo'
});

connection.connect(function(err) {
  if (!err) {
    console.log('SUCCESS!!!');
  } else {
    console.log('Error - bloody Secret lied to me: ', err);
  }
});

const apiRouter = require('./api/api');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

app.use(errorhandler());

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

module.exports = app;
