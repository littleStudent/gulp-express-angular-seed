'use strict';


var config = require('./config/config');


// Init the express application
var app = require('./config/express')();


// Start the app by listening on <port>
app.listen(config.port);

// Expose app
module.exports = app;

// Logging initialization
console.log('Express app started on port ' + config.port);
