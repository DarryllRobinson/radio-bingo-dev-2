const mysql = require('mysql');
//const port = 3306;

//alert('Port: ', port);

//if (port === 3306) {

    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'radio_bingo',
        insecureAuth: true
      });
  /*  });
} else {

   //same as above, with live server details
}*/

connection.connect();

module.exports = connection;
