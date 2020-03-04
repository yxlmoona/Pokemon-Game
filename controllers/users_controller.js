const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const Log = require('../models/logs.js')
const users = express. Router()
//*********presentational route***********//
//user index page

//user new route: sign up new users
users.get('/new', (req, res) => {
  res.render('users/new.ejs')

})

users.get('/show', (req, res) => {
  User.findById(req.session.currentUser._id,(err, foundUser) => {
    Log.find({},(err, foundLog) => {
      res.render('users/show.ejs',{
        logs: foundLog,
        user: req.session.currentUser,
        money: foundUser.money
      })
    })
  })


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

users.put('/', (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
    let num = Math.random()
    let fightCoin = Math.floor(Math.random()*100)
    console.log(num);
    console.log(fightCoin);
    if(num > 0.5){
      foundUser.money = foundUser.money + fightCoin
      foundUser.save((err, data)=>{
          res.redirect('/logs');
      });
    }else{
      foundUser.money = foundUser.money - fightCoin
      foundUser.save((err, data)=>{
          res.redirect('/logs');
      });

    }

  })
})
users.put('/show/100', (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
   foundUser.money = foundUser.money + 100
   foundUser.save((err, data)=>{
    res.redirect('/logs');
  });
  })
})
users.put('/show/1000', (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
   foundUser.money = foundUser.money + 1000
   foundUser.save((err, data)=>{
    res.redirect('/logs');
  });
  })
})
users.put('/show/10000', (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
   foundUser.money = foundUser.money + 10000
   foundUser.save((err, data)=>{
    res.redirect('/logs');
  });
  })
})

//*********functional route end***********//
module.exports = users
