// routes/user.js
const express = require('express')
const user = express.Router()
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

// read user
user.get('/user', async (req, res) =>{
  let results = await knex('user')
  res.json(results)
})

// delete user
user.delete('/user/:id', async (req, res) => {
  try {
    let results = await knex('user')
                        .where('id', req.params.id)
                        .del()
    res.json(results)
  } catch (err) {
    res.status(200).json(err)
  }
})

function validateRegister (req, res, next)  {
  // username min length 3
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      msg: 'Please enter a username with min. 3 chars'
    });
  }
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      msg: 'Please enter a password with min. 6 chars'
    });
  }
  // password (repeat) does not match
  if (
    !req.body.password_repeat ||
    req.body.password != req.body.password_repeat
  ) {
    return res.status(400).send({
      msg: 'Both passwords must match'
    });
  }
  next();
}
user.post('/user', validateRegister, async (req, res, next) => {
  let results = await knex('user')
                        .where('username', req.body.username)
  if (results.length) {
    return res.status(409).send({
      msg: 'This username is already in use!'
    });
  } else {
    // username is available
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send({
          msg: err
        });
      } else {
        // has hashed pw => add to database
        let results = await knex('user')
                              .insert({
                                uuid: uuid.v4(),
                                username: req.body.username,
                                password: hash,
                                registered: new Date()
                              })
        res.json(results)
      }
    });
  }
});

user.post('/user/login', async (req, res, next) => {
  let results = await knex('user')
                        .where('username', req.body.username)
  if (!results.length) {
    return res.status(401).send({
      msg: 'Username or password is incorrect!'
    });
  } else {
    // check password
    var user = results[0]
    bcrypt.compare(req.body.password, user.password, async (bErr, bResult) => {
      // wrong password
      if (bErr) {
        throw bErr;
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      if (bResult) {
        const token = jwt.sign({
            username: user.username,
            userId: user.id
          },
          'SECRETKEY', {expiresIn: '7d'}
        );

        let results = await knex('user')
                              .update({
                                lastlogin: new Date()})
                              .where('id', user.id)
        return res.status(200).send({
          msg: 'Logged in!',
          token,
          user: user
        });
      } else {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
    });
  }
});
module.exports = user;