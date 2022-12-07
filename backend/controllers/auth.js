require('dotenv').config();
require('./passportLocal');
const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error'); 
const { findOne } = require('../models/Auth');

exports.register = async(req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password , salt);

    const newUser = new Auth({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hash,
    })

    try {
        await newUser.save();
        res.status(201).json("User has been created")
    } catch(err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
      const user = await Auth.findOne({ email: req.body.email });
      if (!user) return next(createError(404, "email not found!"));
  
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

// res.clearCookie("access_token", "connect.sid")
// res.redirect('/');