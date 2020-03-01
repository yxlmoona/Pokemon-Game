const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  ingrediates: {
    type: Array,
  },
  procedure: {
    type: String
  }
})
const Log = mongoose.model('Log', logSchema)
module.exports = Log
