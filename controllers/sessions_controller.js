const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const sessions = express.Router()
//*********presentational route***********//
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})
//*********presentational route end***********//
//*********functional route***********//
sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username},(err, foundUser) => {
    if(err){
      console.log(err);
      res.send('oops the db had a problem')
    }
    else if(!foundUser){
      res.send('<a  href="/">Sorry, no user found </a>')

    }else{

      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        console.log(req.session.currentUser)
        res.redirect('/users/show')
        // res.redirect(`/${req.session.currentUser.id}`/index)
      }else{
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})
sessions.delete('/',(req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
  // console.log(req.session.currentUser);
})
//*********functional route end***********//
module.exports = sessions
