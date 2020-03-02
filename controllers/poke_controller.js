const express = require('express')
const Pokemon = require('../models/pokemon.js')
const User = require('../models/users.js')
const pokemon = express.Router()
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
//poke index page
pokemon.get('/', (req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
    res.render('pokemon/index.ejs',{
      pokemonIndex: Pokemon,
      user: req.session.currentUser
    })
  })
})
//edit
pokemon.get('/:id/edit',(req, res) => {
  res.render('pokemon/edit.ejs',{
    index: req.params.id,
    pokemonShow: Pokemon[req.params.id],
    user: req.session.currentUser
  })
})
//show Page
pokemon.get('/:id',(req, res) => {
  User.findById(req.session.currentUser._id, (err, foundUser) => {
  res.render('pokemon/show.ejs',{
    pokemonShow: Pokemon[req.params.id],
    id: req.params.id,
    user: req.session.currentUser
  })
  })
})
module.exports = pokemon
