const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const users = express. Router()
//*********presentational route***********//
//user index page

//user new route: sign up new users
users.get('/new', (req, res) => {
  res.render('users/new.ejs')

})


//*********presentational route end***********//
//*********functional route***********//
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('new created user is ', createdUser);
    res.redirect('/')
  })
})


//*********functional route end***********//
module.exports = users
