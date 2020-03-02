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
  User.findById(req.session.currentUser._id, (err, foundUser) => {
    res.render('logs/index.ejs',{
      logs: foundUser.logs,
      user: req.session.currentUser
    })
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

logs.get('/:id', (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    User.findById(req.session.currentUser.id, (err, foundUser) => {
      res.render('logs/show.ejs',{
       log: foundLog,
       user: req.session.currentUser
      })
    })
  })
})
//edit
logs.get('/:id/edit', (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render('logs/edit.ejs',{
      log: foundLog,
      user: req.session.currentUser
    })
    // console.log(foundLog);
    // console.log(foundLog.task[0]);
  })
})
//*********presentational route end***********//
//*********functional route***********//
//post new log
logs.post('/', (req, res) => {
  const object = {...req.body}
  console.log(object);
  object.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
  }
  User.findById(object.userId, (err,foundUser) => {
    // console.log(req.session.currentUser);
    Log.create(object, (err, createdLog) => {
      foundUser.logs.push(createdLog)
      foundUser.save((err, data) => {
        console.log(foundUser.logs);
        res.redirect('/logs')
      })

    })
  })
})
//delete
logs.delete('/:id', (req, res) => {
  Log.findByIdAndRemove(req.params.id, (err, foundLog) => {
    User.findById(req.session.currentUser._id, (err, foundUser) => {
      foundUser.logs.id(req.params.id).remove()
      foundUser.save((err, data) => {
        res.redirect('/logs')
      })

    })
  })
})

// logs.put('/:id', (req, res) => {
//   const object = {...req.body}
//   console.log(object);
//   object.stats = {
//     hp: req.body.hp,
//     attack: req.body.attack,
//     defense: req.body.defense
//   }
//   Log.findByIdAndUpdate(req.params.id, object, { new: true }, (err, updatedLog)=>{
//         User.findById(req.session.currentUser._id, (err, foundUser)=>{
//             console.log(updatedLog);
//             console.log(foundUser);
//             // foundUser.logs.id(req.params.id).remove();
//             foundUser.logs.push(updatedLog)
//             console.log(foundUser.logs);
//             foundUser.save((err, data)=>{
//                 res.redirect('/logs');
//             });
//         });
//     });
// })



//*********functional route end***********//
module.exports = logs
