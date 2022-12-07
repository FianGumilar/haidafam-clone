const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
//const { checkAuth } = require('../utils/verifyToken')

const { verifyUser } = require('../utils/verifyToken')
const { createError } = require('../utils/error')
const { register, login, googleLogin, logout } = require('../controllers/auth');
require('../controllers/googleAuth')

const isLoggedIn = (req, res, next) => {
    req.user ? next(): res.sendStatus(401)
}

router.post('/register', register);

router.post('/login', login);

router.get('/auth/google', passport.authenticate(
    'google', {scope: ['email', 'profile']})
);

router.get('/auth/google/callback', passport.authenticate(
    'google', {
        successRedirect: '/profile',
        failureRedirect: '/auth/failure'
    }
))

router.get('/profile', isLoggedIn, (req, res) => {
    res.send('Hello from Profile page!');
})

router.get('/auth/failure', (req, res) => {
    res.send('Gagal')
})

// router.get('/logout', (req, res, next) => {
//     req.logout(req.user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       res.redirect('/');
//     });
//   });

router.get('/logout', logout);

module.exports = router;
