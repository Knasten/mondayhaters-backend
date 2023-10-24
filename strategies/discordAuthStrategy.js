const { addUser, findUserByDiscordId, findUserByPk } = require('../controllers/user.controller');

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');


passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  const user = findUserByPk(id)
  if(user)
    done(null, user);
});

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_ID,
  clientSecret: process.env.DISCORD_SECRET,
  callbackURL: process.env.DISCORD_REDIRECT,
  scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const {id:discord_id, username, guilds} = profile;
    const user = await findUserByDiscordId(discord_id)
    if(user) {
      console.log('User found!')
      // User found
      return done(null, user)
    } else {
      // No User found creating and adding a new
      console.log('No user found!')
      const newUser = await addUser(profile)
      return done(null, newUser)
    }
  } catch (err) {
    // Error Occured!
    console.log('ERROR-DISC-AUTH:', err)
    return done(err, null)
  }
}));