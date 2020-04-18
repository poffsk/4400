exports.getRows = function(callback, query, queryId) {
  if (typeof queryId != "undefined") {
    console.log(queryId + ": Query from Connection: " + query);
  } else {
    console.log("Query from Connection: " + query);
  }
  var mysql = require('mysql');

  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Helluva2020!',
    database: 'cs4400spring2020'
  });


  // connect to mysql
  connection.connect(function(err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    }
  });

  // Perform a query
  connection.query(query, function(err, rows, fields) {
    if (err) {
      if (typeof queryId != "undefined") {
        console.log(queryId + ": An error ocurred performing the query.");
        console.log(queryId +": "+err);
      }
      else{
        console.log("An error ocurred performing the query.");
        console.log(err);
      }

      return;
    }

    if (callback != null) {
      callback(rows)
    };
    if (typeof queryId != "undefined") {
      console.log(queryId + ": Query succesfully executed");
    }
    else{
      console.log("Query succesfully executed");
    }
  });

  // Close the connection
  connection.end(function() {
    // The connection has been closed
  });
}
