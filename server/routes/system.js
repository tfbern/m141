// routes/task.js
const express = require('express');
const router = express.Router();
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const auth = require('../auth')

// read the states
router.get('/system', auth.isLoggedIn, async (req, res) =>{
  var results = 'OS'
  res.json({serverEnv:process.env,knexconf})
})

module.exports = router;