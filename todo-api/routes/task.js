// routes/task.js
const express = require('express');
const task = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const auth = require('../auth');

// read view tasks
task.get('/task', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('tasks')
  res.json(results)
})

// read tasks assigned to a certain user
task.get('/task/getByUser/:kuser', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('tasks')
                        .where('kuser', req.params.kuser)
  res.json(results)
})

// create a task via view tasks
task.post('/task', auth.isLoggedIn, async (req, res) =>{
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
task.put('/task/:id', auth.isLoggedIn, async (req, res) =>{
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

// delete task in table task
task.delete('/task/:id', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('task')
                      .where('id', req.params.id)
                      .del()
  res.json(results)
})

// read the  priorities
task.get('/task/priority', auth.isLoggedIn, async (req, res) =>{
  let results = await knex.raw('SHOW COLUMNS FROM task LIKE "priority"')
  results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
  results = results.map((element,index) => {
    return {"id":index, "priority":element}
  });
  res.json(results)
})

// read the states
task.get('/task/state', auth.isLoggedIn, async (req, res) =>{
  let results = await knex.raw('SHOW COLUMNS FROM task LIKE "status"')
  results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
  results = results.map((element,index) => {
    return {"id":index, "state":element}
  });
  res.json(results)
})

module.exports = task;