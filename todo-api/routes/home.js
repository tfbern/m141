// routes/home.js
const express = require('express');
const home = express.Router();

endpoints = [{
    name:'view tasks',
    path:'/api/tasks',
    oprations:'create, read, update'
  },{
    name:'table task',
    path:'/api/task',
    oprations:'delete'
  },{
    name:'table user',
    path:'/api/user',
    oprations:'create, read, delete'
  },
  {
    name:'table user',
    path:'/api/user/login',
    oprations:'read'
  }
]

home.get('/', (req, res) => {
    var html = '<head>'
    html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'
    html += '</head><body><div class="container"><br>'
    html += '<h1>Welcome to Todo-API</h1>'
    html += '<table class="table"><tr>'
    html += '<th>Endpoint</th>'
    html += '<th>Database entity</th>'
    html += '<th>CRUD operations</th></tr>'
    endpoints.forEach(point => {
      html += "<tr><td><a href="
      html += point.path
      html += ">"
      html += point.path
      html += "</a></td><td>"
      html += point.name
      html += "</td><td>"
      html += point.oprations
      html += "</td></tr>"
    });
    html += '</table></div></body>'
    res.send(html)
  })

  module.exports = home;