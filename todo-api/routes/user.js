// routes/user.js
const express = require('express')
const user = express.Router()
const knexconf = require('../knexconf')
const knex = require('knex')(knexconf)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

// read user
user.get('/user', auth.isLoggedIn, async (req, res) =>{
  let results = await knex('user')
  res.json(results)
})

// delete user
user.delete('/user/:id', auth.isLoggedIn, async (req, res) => {
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

user.put('/user/:id', auth.isLoggedIn, async (req, res) => {
  var user = await knex('user').where('username', req.body.username).then(data => data[0])
  var isequal = await bcrypt.compare(req.body.password, user.password)
  if (isequal && req.body.newPassword === req.body.newPasswordRepeat) {
    try {
      var hash = await bcrypt.hash(req.body.newPassword, 10)
      let results = await knex('user')
        .update({
          password: hash,
        })
        .where('username', req.body.username)
      res.json(results)
    } catch (err) {
      res.status(200).json(err)
    }
  }
});

user.post('/user', validateRegister, async (req, res) => {
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
                                username: req.body.username,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                password: hash,
                                registered: new Date()
                              })
        res.json(results)
      }
    });
  }
});

user.post('/user/login', async (req, res) => {
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
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      if (bResult) {
        const token = jwt.sign({
            username: user.username,
            userId: user.id
          },
          'SECRETKEY', {expiresIn: '1d'}
        );

        let results = await knex('user')
                              .update({
                                lastlogin: new Date()})
                              .where('id', user.id)
        return res.status(200).send({
          msg: 'Logged in!',
          token: token,
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