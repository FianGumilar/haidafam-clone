const Souvenir = require('../models/Souvenir');
const Hotel = require('../models/Hotel');
const { createError } = require('../utils/error')


exports.createSouvenir = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newSouvenir = new Souvenir(req.body);

  try {
    const savedSouvenir = await newSouvenir.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { Souvenirs: savedSouvenir._id },
      });
    } catch (err) {
      next(err);
    }
    return res.status(201).json(savedSouvenir);
  } catch (err) {
    return next(err);
  }
};

exports.updateSouvenir = async(req, res, next) => {
    try {
        const updatedSouvenir = await Souvenir.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("update Souvenir successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteSouvenir = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const {id} = req.params;

    try {
      await Souvenir.findByIdAndDelete(id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { Souvenirs: req.params.id } 
        });
      } catch(err) {
        next(err);
      }
    return res.status(200).json("deleted successfully");
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllSouvenirByHotelId = async(req, res, next) => {
    try { 
        const souvenirs = await Souvenir.find();
        return res.status(200).json(souvenirs);
    } catch(err) {
        return res.status(500).json(err);
      }
}

exports.getSouvenirById = async(req, res, next) => {
    try {
        const souvenir = await Souvenir.findById(req.params.id)
        return res.status(200).json(souvenir);
    } catch(err) {
        return res.status(500).json(err);
      }
}