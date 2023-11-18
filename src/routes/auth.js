const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: 'http://localhost:3000/',
  successRedirect: 'http://localhost:3000/'
}));

router.get('/check', (req, res) => {
  // Checks if the user is logged in.
  console.log('Checking if user is logged in')
  if(req.isAuthenticated()){
    console.log('User is loggedIn')
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    console.log('User is not logged in')
    res.json({ isAuthenticated: false })
  }
});

router.get('/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.logOut((err) => {
      if(err) {
        return next(err)
      }
    })
    res.status(200).json({status: 'success'})
  } else {
    res.status(403).json({status: 'error', message: 'You are not logged in.'})
  }
})

module.exports = router;