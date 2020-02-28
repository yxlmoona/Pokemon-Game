//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require ('express-session')
require('dotenv').config()
//___________________
//Configuaration
//___________________
const app = express ();
const db = mongoose.connection;

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ohmycrud';
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {
  useNewUrlParser: false,
  useUnifiedTopology: true,
  useFindAndModify: false
 });
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
//___________________
// Controllers
//___________________
// const logsControllers = require('./controllers/logs_controllers.js')
// app.use('/logs', logsControllers)
// const sessionsControllers = require('./controllers/sessions_controllers.js')
// app.use('/sessions', sessionsControllers)
const usersControllers = require('./controllers/users_controller.js')
app.use('/users', usersControllers)
//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render('main.ejs')
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
