const express = require('express')
const Log = require('../models/logs.js')
const User = require('../models/users.js')
const logs = express.Router()
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
//*********presentational route***********//
//find all users when rendering new page
logs.get('/new',(req, res) => {
  User.find({},(err, allUsers) => {
    res.render('logs/new.ejs',{
      users: allUsers,
      user: req.session.currentUser
    })
  })

})
//*********presentational route end***********//
//*********functional route***********//
logs.post('/', (req, res) => {
  User.findById(req.body.userId, (err,foundUser) => {
    // console.log(req.session.currentUser);
    Log.create(req.body, (err, createdLog) => {
      foundUser.logs.push(createdLog)
      foundUser.save((err, data) => {
        // console.log(foundUser);
        res.redirect('logs/new')
      })

    })
  })
  if (req.body.complete === 'on') {
    req.body.complete = true
  } else {
    req.body.complete = false
  }


})
// logs.put('/logs', (req, res) => {
//   Log.findOneAndUpdate(req.body, (err, createdLog) => {
//
//     res.redirect('/users/show')
//     console.log(createdLog);
//   })

// })


//*********functional route end***********//
module.exports = logs
