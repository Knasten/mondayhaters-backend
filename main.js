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
const {db} = require('./db/firebase.js');


// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

// Middleware Setup
app.use(express.json())
app.use(cors(corsOptions))

app.use(session({
  secret: process.env.DISCORD_SECRET,
  cookie: {
    maxAge: 60000 * 60 * 24,
    secure: false
  },
  saveUninitialized: false,
  resave: false
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