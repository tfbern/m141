// routes/task.js
const express = require('express');
const task = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const auth = require('../auth');

// read table tasks
task.get('/task', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('task')
  res.json(results)
})

// read the  priorities
task.get('/task/priorities', auth.isLoggedIn, async (req, res) =>{
  let results = await knex.raw('SHOW COLUMNS FROM task LIKE "priority"')
  results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
  res.json(results)
})

// read the states
task.get('/task/states', auth.isLoggedIn, async (req, res) =>{
  let results = await knex.raw('SHOW COLUMNS FROM task LIKE "status"')
  results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
  res.json(results)
})

// delete task in table task
task.delete('/task/:id', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('task')
                      .where('id', req.params.id)
                      .del()
  res.json(results)
})
module.exports = task;