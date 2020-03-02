const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Log = require('./logs.js')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  money: Number,
  logs: [Log.schema]

})

// const Log = mongoose.model('Log', logSchema)
const User = mongoose.model('User', userSchema)

module.exports = User
// module.exports = Log
