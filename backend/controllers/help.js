const Help = require('../models/Help');
const { validationResult } = require('express-validator');

exports.createHelp = async(req,res, next) => {
    const newHelp = new Help(req.body);
    const errors = validationResult(req);

    try {
      if(!errors.isEmpty()) {
        errors.array()
        return res.status(422).json({
          path: '/help',
          pageTitle: 'Help Center',
          editing: false,
          hasError: false,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        })
      }
      const savedHelp = await newHelp.save();
      return res.status(200).json(savedHelp);
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.updateHelp = async(req, res, next) => {
  const errors = validationResult(req);
    try {
      if(!errors.isEmpty()) {
        errors.array()
        return res.status(422).json({
          pageTitle: 'Update Help Center',
          editing: true,
          hasError: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        })
      }
        const updatedHelp = await Help.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("Update successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteHelp = async(req, res, next) => {
    const {id} = req.params;

    try {
      await Help.findByIdAndDelete(id);
      return res.status(200).json("deleted successfully!");  
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllHelps = async(req, res, next) => {
    try { 
        const helps = await Help.find();
          return res.status(200).json(helps);
      } catch(err) {
        return next(err);
      }
}

