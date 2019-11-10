const express = require('express')
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        database : 'm141',
        user : 'root',
        password : 'sml12345'
    }
})
const app = express()
app.use(express.json())
app.get('/', async (req, res) =>{
    res.redirect('/api')
})
app.get('/api', (req, res) => {
  var html = '<head>'
  html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'
  html += '</head><body><div class="container">'
  html += '<br><h1>Welcome to Todo-API</h1>'
  html += '<table class="table">'
  html += '<tr><th>Endpoint</th><th>Database entity</th><th>CRUD operations</th></tr>'
  html += '<tr><td><a href="/api/todo">/api/todo</a></td><td>view tasks</td><td>create, read, update</td></tr>'
  html += '<tr><td><a href="/api/task">/api/task</a></td><td>table task</td><td>read, delete</td></tr>'
  html += '<tr><td><a href="/api/priority">/api/priority</a></td><td>table priority</td><td>read</td></tr>'
  html += '<tr><td><a href="/api/owner">/api/owner</a></td><td>table owner</td><td>read</td></tr>'
  html += '<tr><td><a href="/api/status">/api/status</a></td><td>table status</td><td>read</td></tr>'
  html += '</table></div></body>'
  res.send(html)
})
/* VIEW */
// read view tasks
app.get('/api/todo', async (req, res) =>{
    let results = await knex('tasks')
    res.json(results)
})
// create a task via view tasks
app.post('/api/todo', async (req, res) =>{
    let results = await knex('tasks')
                        .insert({done: req.body.done,
                            text: req.body.text,
                            startdate: req.body.startdate,
                            duedate: req.body.duedate,
                            kpriority: req.body.kpriority, 
                            kstatus: req.body.kstatus, 
                            kowner: req.body.kowner
                        })
    res.json(results)
    console.log("Creating record with values " + JSON.stringify(req.body))
})
// update a task via view tasks
app.put('/api/todo/:id', async (req, res) =>{
    let results = await knex('tasks')
                        .update({done: req.body.done, 
                            text: req.body.text,
                            startdate: req.body.startdate,
                            duedate: req.body.duedate,
                            kpriority: req.body.kpriority, 
                            kstatus: req.body.kstatus, 
                            kowner: req.body.kowner})
                        .where('id', req.params.id)
    res.json(results)
    console.log("Updating record " + req.params.id + " to " + JSON.stringify(req.body))
})
// deletion via view not possible (Error Code: 1395. Can not delete from join view)
// deletion will be done on the table directly.

/* TABLES */
// read table tasks
app.get('/api/task', async (req, res) =>{
    let results = await knex('task')
    res.json(results)
})
// read table priority
app.get('/api/priority', async (req, res) =>{
    let results = await knex('priority')
    res.json(results)
})
// read table possessor
app.get('/api/owner', async (req, res) =>{
    let results = await knex('owner')
    res.json(results)
})
// read table status
app.get('/api/status', async (req, res) =>{
    let results = await knex('status')
    res.json(results)
})
// delete task in table task
app.delete('/api/task/:id', async (req, res) =>{
    let results = await knex('task')
                        .where('id', req.params.id)
                        .del()
    res.json(results)
    console.log("Deleting record ID " + req.params.id)
})
app.listen(3000, () => console.log("Listening on port 3000"))