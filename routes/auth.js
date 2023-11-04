const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: 'http://localhost:3000/',
  successRedirect: 'http://localhost:3000/'
}));

module.exports = router;