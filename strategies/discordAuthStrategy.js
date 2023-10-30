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
    let user = await findUserByDiscordId(discord_id)
    if(!user) {
      // No User found creating and adding a new
      console.log('No user found!')
      user = await addUser(profile)
    }

    // Check if user is member of the correct channel
    for(const guild of guilds){
      console.log(guild.name)
      if(guild.name === process.env.GUILD_NAME){
        user.isMember = true;
        await user.save()
        break;
      } else {
        user.isMember = false;
        await user.save()
      }}

    return done(null, user);
  } catch (err) {
    // Error Occured!
    console.log('ERROR-DISC-AUTH:', err)
    return done(err, null)
  }
}));