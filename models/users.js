const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Log = require('./logs.js')
// const logSchema = new Schema({
//   date:{
//     type:Date,
//     default: Date.now
//   },
//   task:[{
//     type: String,
//   }],
//   complete: {type: Boolean},
//   user: { type: Schema.Types.ObjectId, ref: 'User' },
// })
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  logs: [Log.schema]
  // logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }]
})

// const Log = mongoose.model('Log', logSchema)
const User = mongoose.model('User', userSchema)

module.exports = User
// module.exports = Log
