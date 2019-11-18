// routes/router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('./db.js');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    database : 'm141',
    user : 'webapp',
    password : 'sml12345'
  }
})
const userMiddleware = require('./users.js');

router.get('/', (req, res) => {
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
router.get('/todo', async (req, res) =>{
    let results = await knex('tasks')
    res.json(results)
})
// create a task via view tasks
router.post('/todo', async (req, res) =>{
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
router.put('/todo/:id', async (req, res) =>{
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
router.get('/task', async (req, res) =>{
    let results = await knex('task')
    res.json(results)
})
// read table priority
router.get('/priority', async (req, res) =>{
    let results = await knex('priority')
    res.json(results)
})
// read table possessor
router.get('/owner', async (req, res) =>{
    let results = await knex('owner')
    res.json(results)
})
// read table status
router.get('/status', async (req, res) =>{
    let results = await knex('status')
    res.json(results)
})
// delete task in table task
router.delete('/task/:id', async (req, res) =>{
    let results = await knex('task')
                        .where('id', req.params.id)
                        .del()
    res.json(results)
    console.log("Deleting record ID " + req.params.id)
})

/* Login Routes */
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  // console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM user WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`, (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO user (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, ${db.escape(hash)}, now())`, (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM user WHERE username = ${db.escape(req.body.username)};`, (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
        // wrong password
        if (bErr) {
          throw bErr;
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
        if (bResult) {
          const token = jwt.sign({
              username: result[0].username,
              userId: result[0].id
            },
            'SECRETKEY', {expiresIn: '7d'}
          );
          db.query(
            `UPDATE user SET lastlogin = now() WHERE id = '${result[0].id}'`
          );
          return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]
          });
        }
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      });
    }
  );
});

module.exports = router;