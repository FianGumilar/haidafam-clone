require('dotenv').config();
const passport = require('passport');
const user = require('../models/User');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '757284574516-7mrsl9cdg76fjl0fjd7ffo7cjnukbr30.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
((request, accessToken, refreshToken, profile, done) => {
  console.log(profile.emails[0].value);
  return done(null, profile)
   //user.findOne({ email: profile.emails[0].value }).then((data) => 
  })
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    //user.findById(id, (err, user) => {
      done(null, user);
    //})
});
