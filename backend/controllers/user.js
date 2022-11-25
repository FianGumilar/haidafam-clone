const User = require('../models/User');

exports.updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          res.status(200).json(updatedUser);
      } catch(err) {
        res.status(500).json(err);
      }
}

exports.deleteUser = async(req, res, next) => {
    const {id} = req.params;

    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("deleted successfully!");  
    } catch(err) {
      res.status(500).json(err);
    }
}

exports.getAllUsers = async(req, res, next) => {
    try { 
        const users = await User.find();
        res.status(200).json(users);
      } catch(err) {
        next(err);
      }
}

exports.getUserById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
      } catch(err) {
        res.status(500).json(err);
      }
}