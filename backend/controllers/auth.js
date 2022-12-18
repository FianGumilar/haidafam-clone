require('dotenv').config();
require('./passportLocal');
const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { createError } = require('../utils/error'); 
const { findOne } = require('../models/Auth');
const limitter = require('express-rate-limit');
const { validationResult } = require('express-validator');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER_KEY,
    pass: process.env.PASS_KEY
  }
})

exports.register = async(req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password , salt);
    const errors = validationResult(req);
    const email = req.body.email;

    const newUser = new Auth({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hash,
    })

    try {
        if(!errors.isEmpty()) {
          return res.status(422).json({
            path: '/register',
            pageTitle: 'Register',
            errorMessage: errors.array()
          })
        }
        await newUser.save();
        res.status(201).json("User has been created")

        return transport.sendMail({
            to: email,
            from: 'Dafams@hotel.com',
            subject: 'Signup Success',
            html: '<h1>Welcome, You are succesfully signed up!</h1>'
          }) 
    } catch(err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

    try {
      if(!errors.isEmpty()) {
        errors.array()
        return res.status(422).json({
          path: '/login',
          pageTitle: 'Login',
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        }) 
      }
      const user = await Auth.findOne({ email: req.body.email });
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
  
      }
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SEC);
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
      next(err);
    }
  };

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err)
      } else {
        res.clearCookie('access_token')
        res.redirect('/')
      }
    })
  }
}

exports.registerLimit = limitter({
    windowMs: 5 * 60 * 1000,
    max: 5
});

exports.loginLimit = limitter({
  windowMs: 5 * 60 * 1000,
  max: 5
});

// res.clearCookie("access_token", "connect.sid")
// res.redirect('/');