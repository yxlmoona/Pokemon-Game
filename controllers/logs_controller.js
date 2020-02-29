const express = require('express')
const Log = require('../models/logs.js')
const logs = express.Router()
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
//*********presentational route***********//
logs.get('/logs',(req, res) => {
  res.send('hello')
})
//*********presentational route end***********//


//*********functional route***********//
//*********functional route***********//
module.exports = logs
