const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, body } = require('express-validator');
//const { checkAuth } = require('../utils/verifyToken')
const User = require('../models/User');
const { register, login, googleLogin, logout, registerLimit, loginLimit } = require('../controllers/auth');
require('../controllers/googleAuth')

const isLoggedIn = (req, res, next) => {
    req.user ? next(): res.sendStatus(401)
}

router.post('/register', [
    body('username')
        .isLength({min: 3})
        .withMessage('The full name must be longer than 3 characters'),
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
        .toLowerCase()
        .withMessage('Invalid email, Example: johndoe@gmail.com')
        .custom((value, {req}) => {
            return User.findOne({ email: value }).then(userDoc => {
                if(userDoc) {
                    return Promise.reject(
                        'E-mail already exists'
                    )
                }
            })
        }),
    body('password')
        .trim()
        .isLength(5)
        .withMessage('Please enter a password at least 5 characters.')]
,registerLimit, register);

router.get('/register', register);

router.post('/login', [
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
        .toLowerCase()
        .withMessage('Please enter a valid email.'),
    check('password', 'Password has to be valid.')
        .trim()
        .isLength(5)  
], loginLimit, login);

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
