// routes/tasks.js
const express = require('express');
const tasks = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)

// read view tasks
tasks.get('/tasks', async (req, res) =>{
  let results = await knex('tasks')
  res.json(results)
})

// read view tasks
tasks.get('/tasks/:kuser', async (req, res) =>{
let results = await knex('tasks')
                      .where('kuser', req.params.kuser)
res.json(results)
})

// create a task via view tasks
tasks.post('/tasks', async (req, res) =>{
  let results = await knex('tasks')
                      .insert({
                        text: req.body.text,
                        startdate: req.body.startdate,
                        duedate: req.body.duedate,
                        priority: req.body.priority, 
                        status: req.body.status, 
                        kuser: req.body.kuser
                      })
  res.json(results)
})

// update a task via view tasks
tasks.put('/tasks/:id', async (req, res) =>{
  let results = await knex('tasks')
                      .update({
                        text: req.body.text,
                        startdate: req.body.startdate,
                        duedate: req.body.duedate,
                        priority: req.body.priority,
                        status: req.body.status, 
                        kuser: req.body.kuser})
                      .where('id', req.params.id)
  res.json(results)
})
module.exports = tasks;