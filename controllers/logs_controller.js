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
//log index page
logs.get('/', (req, res) => {
  res.render('logs/index.ejs',{
    user: req.session.currentUser
  })
})
//New, find all users when rendering new page
logs.get('/new',(req, res) => {
  User.find({},(err, allUsers) => {
    res.render('logs/new.ejs',{
      users: allUsers,
      user: req.session.currentUser
    })
  })

})
// Show, show all the logs under log in user
logs.get('/:id',(req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render('logs/show.ejs',{
      user: req.session.currentUser,
      log: foundLog
    })
    // console.log(foundLog.date);
  })
})
//*********presentational route end***********//
//*********functional route***********//
//post new log
logs.post('/', (req, res) => {
  User.findById(req.body.userId, (err,foundUser) => {
    // console.log(req.session.currentUser);
    Log.create(req.body, (err, createdLog) => {
      foundUser.logs.push(createdLog)
      foundUser.save((err, data) => {
        console.log(foundUser.logs);
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
