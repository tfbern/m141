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
// read
app.get('/api/todo', async (req, res) =>{
    let results = await knex('tasks')
    res.json(results)
})
// create
app.post('/api/todo', async (req, res) =>{
    let results = await knex('tasks')
                        .insert({text: req.body.text})
    res.json(results)
})
// update
app.put('/api/todo/:id', async (req, res) =>{
    let results = await knex('tasks')
                        .update({done: req.body.done})
                        .where('id', req.params.id)
    res.json(results)
    // console.log(req.params.id, req.body.done)
})
// delete
app.delete('/api/todo/:id', async (req, res) =>{
    let results = await knex('tasks')
                        .where('id', req.params.id)
                        .del()
    res.json(results)
})
app.listen(3000, () => console.log("Listening on port 3000"))