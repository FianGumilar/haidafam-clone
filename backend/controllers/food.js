const Food = require('../models/Food');
const Hotel = require('../models/Hotel');
const { createError } = require('../utils/error')


exports.createFood = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  const newFood = new Food(req.body);

  try {
    const savedFood = await newFood.save();
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { Foods: savedFood._id },
      });
    } catch (err) {
      next(err);
    }
    return res.status(201).json(savedFood);
  } catch (err) {
    return next(err);
  }
};

exports.updateFood = async(req, res, next) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("update Food successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteFood = async(req, res, next) => {
    const hotelid = req.params.hotelid;
    const {id} = req.params;

    try {
      await Food.findByIdAndDelete(id);
      try {
        await Hotel.findByIdAndUpdate(hotelid, {
            $pull: { Foods: req.params.id } 
        });
      } catch(err) {
        next(err);
      }
    return res.status(200).json("deleted successfully");
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllFoodByHotelId = async(req, res, next) => {
    try { 
        const foods = await Food.find();
        return res.status(200).json(foods);
    } catch(err) {
        return res.status(500).json(err);
      }
}

exports.getFoodById = async(req, res, next) => {
    try {
        const food = await Food.findById(req.params.id)
        return res.status(200).json(food);
    } catch(err) {
        return res.status(500).json(err);
      }
}