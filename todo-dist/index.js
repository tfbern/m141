/*
 * Author:      Samuel Hess
 * File name:   index.js
 * Version:     1.0
 * Description: The main file of the REST API
 *              Initialize express and other dependencies
 *              Redirect requests to routing controller
 */

const port = process.env.PORT || 80
const express = require('express')
const app = express()
// logs requests including body to console
// use logging if environment variable defined by nodemon.json is true
const logging = process.env.nodemon_logging || false
if (logging){
  var morgan = require('morgan') 
  morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
  app.use(morgan(':method :url :body :status'))
}

// add routes
app.use(express.json())
const home = require('./routes/home');
const tasks = require('./routes/tasks');
const task = require('./routes/task');
const user = require('./routes/user');
app.use('/api', home);
app.use('/api', tasks);
app.use('/api', task);
app.use('/api', user);

// host GUI as static content
app.use('/', express.static(__dirname + '/gui'));
app.use('/js', express.static(__dirname + '/gui/js'));
app.use('/css', express.static(__dirname + '/gui/css'));
    
app.listen(port, console.log("Listening on port " + port))