const express = require('express')
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        database : 'todo',
        user : 'root',
        password : 'sml12345'
    }
})
const app = express()
app.use(express.json())
app.get('/api', (req, res) => {
  res.send('Welcome to Todo-API')
})
// read view aufgaben
app.get('/api/todo', async (req, res) =>{
    let results = await knex('aufgaben')
    res.json(results)
})
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
    let results = await knex('possessor')
    res.json(results)
})
// read table status
app.get('/api/status', async (req, res) =>{
    let results = await knex('state')
    res.json(results)
})
// create a task via view aufgaben
app.post('/api/todo', async (req, res) =>{
    let results = await knex('aufgaben')
                        .insert({done: req.body.done,
                            text: req.body.text,
                            start: req.body.start,
                            due: req.body.due,
                            kpriority: req.body.kpriority, 
                            kstatus: req.body.kstatus, 
                            kowner: req.body.kowner
                        })
    res.json(results)
    console.log("Creating record with values " + JSON.stringify(req.body))
})
// update a task via view aufgaben
app.put('/api/todo/:id', async (req, res) =>{
    let results = await knex('aufgaben')
                        .update({done: req.body.done, 
                            text: req.body.text,
                            start: req.body.start,
                            due: req.body.due,
                            kpriority: req.body.kpriority, 
                            kstatus: req.body.kstatus, 
                            kowner: req.body.kowner})
                        .where('id', req.params.id)
    res.json(results)
    console.log("Updating record " + req.params.id + " to " + JSON.stringify(req.body))
})
// delete task via table tasks
// deletion via view not possible (Error Code: 1395. Can not delete from join view 'todo.aufgaben')
app.delete('/api/task/:id', async (req, res) =>{
    let results = await knex('tasks')
                        .where('id', req.params.id)
                        .del()
    res.json(results)
    console.log("Deleting record ID " + req.params.id)
})
app.listen(3000, () => console.log("Listening on port 3000"))