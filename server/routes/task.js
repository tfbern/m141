// routes/task.js
const express = require('express');
const task = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const auth = require('../auth');

async function getNumberOfTables() {
  if (knexconf.client === 'mysql' || knexconf.client === 'mysql2') {
    return await knex.raw('SHOW TABLES')
      .then(results => results[0].length)
  }
  else if (knexconf.client === 'postgres' || knexconf.client === 'pg') {
    return await knex.raw("select * from information_schema.tables where table_schema='public'")
                    .then(results => results.rowCount)
  } 
}
async function getForeignKey(table, value) {
  return await knex(table)
    .where(table, value)
    .then(data => data[0].id)
}
async function getEnunValues(field) {
  var results
  if (knexconf.client === 'mysql' || knexconf.client === 'mysql2') {
    results = await knex.raw(`SHOW COLUMNS FROM task LIKE "${field}"`)
    results = results[0][0].Type.replace(/enum|\(|\)|\'/g,'').split(',')
  } 
  else if (knexconf.client === 'postgres' || knexconf.client === 'pg') {
    results = await knex.raw(`select enum_range(null::${field})`)
    results = results.rows[0].enum_range.replace(/"|{|}|\\/g,'').split(',')
  }
  return results.map((element,index) => {
    var obj = {}
    obj['id'] = index
    obj[field] = element
    return obj
  }); 
}

// read view tasks
task.get('/task', auth.isLoggedIn, async (req, res) =>{
  var results = await knex('tasks')
  res.json(results)
})

// read tasks assigned to a certain user
task.get('/task/getByUser/:kuser', auth.isLoggedIn, async (req, res) =>{
  var results
  var user = await knex('user')
    .where('id', req.params.kuser)
    .then(data => data[0])
  if (user && user.role === 'admin') {
    results = await knex('tasks')
  } else {
    results = await knex('tasks')
      .where('kuser', req.params.kuser)
  }
  res.json(results)
})

// create a task via view tasks
task.post('/task', auth.isLoggedIn, async (req, res) =>{
  var text = req.body.text
  var startdate = req.body.startdate
  var duedate = req.body.duedate
  var user = req.body.kuser
  var priority = req.body.priority
  var status = req.body.status
  if (await getNumberOfTables() > 3) {
    priority = await getForeignKey('priority', req.body.priority)
    status = await getForeignKey('status', req.body.status)
  }
  try {
    var results = await knex('task')
                        .insert({text, startdate, duedate, priority, status, user})
    res.json(results)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update a task via view tasks
task.put('/task/:id', auth.isLoggedIn, async (req, res) =>{
  var text = req.body.text
  var startdate = req.body.startdate
  var duedate = req.body.duedate
  var user = req.body.kuser
  var priority = req.body.priority
  var status = req.body.status
  if (await getNumberOfTables() > 3) {
    priority = await getForeignKey('priority', req.body.priority)
    status = await getForeignKey('status', req.body.status)
  }
  try {
    var results = await knex('task')
                        .update({text, startdate, duedate, priority, status, user})
                        .where('id', req.params.id)
    res.json(results)
  } catch (err) {
    res.status(200).json(err)
  }
})

// delete task in table task
task.delete('/task/:id', auth.isLoggedIn, async (req, res) =>{
  var results = await knex('task')
                      .where('id', req.params.id)
                      .del()
  res.json(results)
})

// read the priorities
task.get('/task/priority', auth.isLoggedIn, async (req, res) =>{
  var results 
  var n = await getNumberOfTables()
  if (n === 3) { // design with 2 tables and 1 view
    results = await getEnunValues('priority')
  } else if (n > 3) {
    results = await knex('priority')
  }
  res.json(results)
})

// read the states
task.get('/task/state', auth.isLoggedIn, async (req, res) =>{
  var results 
  var n = await getNumberOfTables()
  if (n === 3) { // design with 2 tables and 1 view
    results = await getEnunValues('status')
  } else if (n > 3) {
    results = await knex('status')
  }
  res.json(results)
})

module.exports = task;