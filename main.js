// ENVIRONMENT SETUP
require('dotenv').config()
const PORT = process.env.PORT || 3001

// App Setup
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const discordAuthStrategy = require('./strategies/discordAuthStrategy');


// Middleware Setup
app.use(express.json())
app.use(cors())

app.use(session({
  secret: process.env.SECRET_KEY,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// Routes
const itemsRoute = require('./routes/items');
app.use('/items', itemsRoute)

const authRoute = require('./routes/auth');
app.use('/auth', authRoute)

const reservationRoute = require('./routes/reservation');
app.use('/reservation', reservationRoute)

app.listen({port:PORT}, async() => {
  console.log('Listening on port: ' + PORT)
})