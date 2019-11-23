const useLogging = true
const express = require('express')
const app = express()
app.use(express.json())
if (useLogging){
  var morgan = require('morgan') // logs requests on console
  morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
  app.use(morgan(':method :url :body :status')) // use 'tiny' or 'combined'
}

// add routes
const home = require('./routes/home');
const tasks = require('./routes/tasks');
const task = require('./routes/task');
const user = require('./routes/user');
app.use('/api', home);
app.use('/api', tasks);
app.use('/api', task);
app.use('/api', user);
app.get('/', (req, res) =>{
    res.redirect('/api')
})
    
app.listen(3000, () => console.log("Listening on port 3000"))