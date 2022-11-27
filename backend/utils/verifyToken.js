require('dotenv').config();
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { createError } = require('./error');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
  });
  next();
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }
    else {
      return next(createError(403, "You are not autorization!"))
    }
  })
}

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.isAdmin) {
      return next();
    }
    else {
      return next(createError(403, "You are not admin!"))
    }
  })
}

module.exports = {verifyToken, verifyUser, verifyAdmin}