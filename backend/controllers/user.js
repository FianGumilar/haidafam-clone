const User = require('../models/User');

exports.createUser = async(req,res, next) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch(err) {
    if(err.code == '11000'){
      res.json({
          msg:'cannot same',
          success:false
      })
  }
    return res.status(500).json(err);
  }
}

exports.updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("updated successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteUser = async(req, res, next) => {
    const {id} = req.params;

    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json("deleted successfully!");  
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllUsers = async(req, res, next) => {
    try { 
        const users = await User.find();
        return res.status(200).json(users);
      } catch(err) {
        next(err);
      }
}

exports.getUserById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user);
      } catch(err) {
        return res.status(500).json(err);
      }
}