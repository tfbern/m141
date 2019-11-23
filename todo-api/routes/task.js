// routes/task.js
const express = require('express');
const task = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)

// read table tasks
task.get('/task', async (req, res) =>{
  let results = await knex('task')
  res.json(results)
})

// read the  priorities
task.get('/task/priorities', async (req, res) =>{
let results = await knex.raw('SHOW COLUMNS FROM task LIKE "priority"')
results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
res.json(results)
})

// read the states
task.get('/task/states', async (req, res) =>{
let results = await knex.raw('SHOW COLUMNS FROM task LIKE "status"')
results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
res.json(results)
})

// delete task in table task
task.delete('/task/:id', async (req, res) =>{
let results = await knex('task')
                    .where('id', req.params.id)
                    .del()
res.json(results)
})
module.exports = task;