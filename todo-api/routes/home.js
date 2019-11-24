// routes/home.js
const express = require('express');
const home = express.Router();

endpoints = [{
    name:'/api/tasks/:id',
    entity:'view tasks',
    path:'/api/tasks',
    oprations:'POST, GET, PUT'
  },{
    name:'/api/task/:id',
    entity:'table task',
    path:'/api/task',
    oprations:'GET, DELETE'
  },{
    name:'/api/user/:id',
    entity:'table user',
    path:'/api/user',
    oprations:'POST, GET, DELETE'
  },
  {
    name:'/api/user/login',
    entity:'table user',
    path:'/api/user/login',
    oprations:'POST'
  }
]

home.get('/', (req, res) => {
    var html = '<head>'
    html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'
    html += '</head><body><div class="container"><br>'
    html += '<h1>Welcome to Todo-API</h1>'
    html += '<p>To access the endpoints you need a valid session. Your client (browser, Postman, axios, etc.) must include a valid bearer token in the authorization field of the http header!</p>'
    html += '<table class="table"><tr>'
    html += '<th>Endpoint</th>'
    html += '<th>Database entity</th>'
    html += '<th>HTTP methods</th></tr>'
    endpoints.forEach(point => {
      html += "<tr><td><a href="
      html += point.path
      html += ">"
      html += point.name
      html += "</a></td><td>"
      html += point.entity
      html += "</td><td>"
      html += point.oprations
      html += "</td></tr>"
    });
    html += '</table></div></body>'
    res.send(html)
  })

  module.exports = home;