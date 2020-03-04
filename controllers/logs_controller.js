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
logs.get('/', isAuthenticated, (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
    
    res.render('logs/index.ejs',{
      money: foundUser.money,
      logs: foundUser.logs,
      user: req.session.currentUser,

    })
    // console.log("Money" + foundUser.money);
    // console.log(foundUser.logs);
  })
})
//New
// logs.get('/new',isAuthenticated,(req, res) => {
//   User.find({},(err, allUsers) => {
//     res.render('logs/new.ejs',{
//       users: allUsers,
//       user: req.session.currentUser,
//       money: foundUser.money
//     })
//   })
//
// })
// Show

logs.get('/:id', isAuthenticated,(req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    User.findById(req.session.currentUser._id, (err, foundUser) => {
      res.render('logs/show.ejs',{
       log: foundLog,
       user: req.session.currentUser,
       money: foundUser.money
      })
    })
  })
})
//edit
logs.get('/:id/edit',isAuthenticated, (req, res) => {
 User.findById(req.session.currentUser._id, (err, foundUser) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render('logs/edit.ejs',{
      log: foundLog,
      user: req.session.currentUser,
      money: foundUser.money
    })
    // console.log(foundLog);
    // console.log(foundLog.task[0]);
  })
 })
})
//*********presentational route end***********//
//*********functional route***********//
//post

logs.post('/', isAuthenticated,(req, res) => {
  const object = {...req.body}
  console.log(object);
  object.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
  }
  User.findById(object.userId, (err,foundUser) => {
      Log.create(object, (err, createdLog) => {
        if(object.money < 0 ){
          res.redirect('/users/show')
        }else{

        foundUser.money = object.money

        foundUser.logs.push(createdLog)
        foundUser.save((err, data) => {
          // console.log(foundUser.logs);
          res.redirect('/logs')
        })
      }
        })
      })

})
//delete
logs.delete('/:id', isAuthenticated,(req, res) => {
  Log.findByIdAndRemove(req.params.id, (err, foundLog) => {
    User.findById(req.session.currentUser._id, (err, foundUser) => {
      foundUser.logs.id(req.params.id).remove()
      foundUser.save((err, data) => {
        res.redirect('/logs')
      })

    })
  })
})
//edit
logs.put('/:id/edit', isAuthenticated,(req, res) => {
  const object = {...req.body}
  console.log(object)
  object.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
  }
  Log.findByIdAndUpdate(req.params.id, object, { new: true }, (err, updatedLog)=>{
        User.findById(req.session.currentUser._id, (err, foundUser)=>{
          if (object.money<0) {
            res.redirect('/users/show')
          }else{
            foundUser.money = foundUser.money - object.money
              // console.log(updatedLog);
              // console.log(foundUser);
            foundUser.logs.id(req.params.id).remove();
            foundUser.logs.push(updatedLog)
              // console.log(foundUser.logs);
            foundUser.save((err, data)=>{
                res.redirect('/logs');
            });
          }

        });
    });
})



//*********functional route end***********//
module.exports = logs
