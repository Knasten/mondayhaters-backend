const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const {getAllUsers} = require('./helper');
const {db} = require('../db/firebase');


passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  // Id being passed in here is the normal userId not the discord one.
  const docRef = db.collection('Users').doc(id)
  const docSnapshot = await docRef.get();
  if(docSnapshot.exists) {
    const userData = docSnapshot.data();
    done(null, userData);
  }
});

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_ID,
  clientSecret: process.env.DISCORD_SECRET,
  callbackURL: process.env.DISCORD_REDIRECT,
  scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const {id, username, guilds} = profile;
    const userRef = db.collection('Users');

    // Check if user is member of the correct channel
    for(const guild of guilds){
      if(guild.name === process.env.GUILD_NAME){
        let user;
        const docs = await getAllUsers();
        docs.forEach((doc) => {
          if(doc.discord_id === id){
            user = doc;
          }
        })
        console.log(user)

        if(!user) {
          // Since no user was found it will be undefined and we need to update and create a new one
          user = await userRef.add({
            discord_id: id,
            username,
            isMember: true
          })
        }
        return done(null, user);
      }
    }

    // If it reaches this step the user is not part of the guild
    // And the login should be treated as invalid
    throw new Error('Unauthorized Access', 403)
    
  } catch (err) {
    return done(null, null)
  }
}));