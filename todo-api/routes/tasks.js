// routes/tasks.js
const express = require('express');
const tasks = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const auth = require('../auth');

// read view tasks
tasks.get('/tasks', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('tasks')
  res.json(results)
})

// read view tasks
tasks.get('/tasks/:kuser', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('tasks')
                        .where('kuser', req.params.kuser)
  res.json(results)
})

// create a task via view tasks
tasks.post('/tasks', auth.isLoggedIn, async (req, res) =>{
  try {
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
  } catch (err) {
    res.status(200).json(err)
  }
})

// update a task via view tasks
tasks.put('/tasks/:id', auth.isLoggedIn, async (req, res) =>{
  try {
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
  } catch (err) {
    res.status(200).json(err)
  }
})
module.exports = tasks;