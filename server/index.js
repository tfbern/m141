/*
 * Author:      Samuel Hess
 * File name:   index.js
 * Version:     1.0
 * Description: The main file of the REST API
 *              Initialize express and other dependencies
 *              Redirect requests to routing controller
 */

const port = process.env.PORT || 80 // take port from environment variable if present (e.g. at heroku)
const express = require('express')
const fallback = require('express-history-api-fallback')
const app = express()
// logs requests including body to console
// use logging if environment variable defined by nodemon.json is true
const logging = process.env.nodemon_logging || false
if (logging){
  var morgan = require('morgan') 
  morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
  app.use(morgan(':method :url :body :status'))
}

app.use(express.json())

// add routes
const home = require('./routes/home');
const task = require('./routes/task');
const user = require('./routes/user');
app.use('/api', home);
app.use('/api', task);
app.use('/api', user);

// host GUI as static content
const root = `${__dirname}/../client/dist`
app.use('/', express.static(root))
app.use('/js', express.static(root+ '/js'));
app.use('/css', express.static(root + '/css'));
app.use(fallback('index.html', { root }))
    
app.listen(port, console.log("Serving GUI at web root and API at /api on localhost port " + port))

// test db connection
const knexconf = require('./knexconf')
const knex = require('knex')(knexconf)
try {
  knex.raw("SELECT VERSION();").then(
    console.log('Sucessfully conneted to ' + knexconf.client + ' database at ' + knexconf.connection.split('@')[1])
  )
} catch (err) {
  console.error(err)
}