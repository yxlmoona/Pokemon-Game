const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logSchema = new Schema({
  date:{
    type:Date,
    default: Date.now
  },
  task:[{
    type: String,
  }],
  complete: {type: Boolean},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})
const Log = mongoose.model('Log', logSchema)
module.exports = Log
